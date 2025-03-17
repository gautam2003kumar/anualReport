import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt  from "jsonwebtoken";
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict"
}

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Validation - not empty
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists: username, email
    const existedUsername = await User.findOne({ username });

    if (existedUsername) {
        throw new ApiError(409, "This username already exists");
    }

    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
        throw new ApiError(409, "This email already exists");
    }

    // Create user object - create entry in DB
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    });

    // Remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // Check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user");
    }

    // Return response
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async(req, res) => {
    
    //take data from req boy
    const {username, email, password} = req.body

    //username or email
    if(!username && !email){
        throw new ApiError(400, "username or email is required")
    }

    //find user
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "user doesn't exits")
    }

    //check password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Wrong password, access denied");
    }

    //access and refresh token
    const tokens = await generateAccessAndRefereshTokens(user._id);
    const accessToken = await tokens.accessToken;
    const refreshToken = await tokens.refreshToken;
    
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Token generation failed");
    }

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")


    //send cookie
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedinUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )  
})

const logoutUser = asyncHandler( async(req, res) =>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200, {}, "User logged Out"
        )
    )
})

const checkAuth = asyncHandler(async(req, res) =>{
    const accessToken = req.cookies.accessToken;

    if(accessToken){
        res.json({isAuthenticated: true});
    }else{
        res.json({isAuthenticated: false});
    }
});

const refreshAccessToken = asyncHandler(async (req, res) =>{
    const incomingRefreshtoken = req.cookie.refreshToken || req.body.refreshToken

    if(!incomingRefreshtoken){
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshtoken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const tokens = await generateAccessAndRefereshTokens(user._id);
    
        const accessToken = await tokens.accessToken;
        const newRefreshToken = await tokens.refreshToken;
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) =>{
    const {oldPassword, newPassword, confirmPassword} = req.body

    if(newPassword !== confirmPassword){
        throw new ApiError(400, "Password doesn't match")
    }

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid passwword");
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {}, 
            "Password changed successfully"
        )
    )

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "User fetched successfully"
            )
        );
});


const updateAccountDetails = asyncHandler(async(req, res) => {
    console.log("Received request to update account details");
    console.log("Request body:", req.body);
    console.log("Authenticated user ID:", req.user?._id);
    const {fullName, email} = req.body


    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true, runValidators: true }
        
    ).select("-password")
    console.log(user)

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Email or username is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const otp = generateOTP(); 
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save({ validateBeforeSave: false });

    await sendEmail(user.email, "OTP for Reset Password", `Your OTP is: ${otp}`);

    return res.status(200).json(
        new ApiResponse(200, {}, "OTP sent to your email")
    );
});


const verifyOtp = asyncHandler(async (req, res) => {
    const { otp, email } = req.body;

    if (!otp || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.otp || (user.otpExpires && user.otpExpires.getTime() < Date.now()) || user.otp !== otp) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    // Remove OTP after successful verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    const tokens = await generateAccessAndRefereshTokens(user._id);
    const accessToken = await tokens.accessToken;
    const refreshToken = await tokens.refreshToken;

    if(!accessToken || !refreshToken){
        throw new ApiError(404, "Something went wrong while generating access and refresh token");
    }


    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {accessToken, refreshToken},
            "OTP verified successfully!"
        )
    );
});

const resetPassword = asyncHandler(async (req, res) => {

    const { newPassword, confirmPassword } = req.body;
    const incomingRefreshtoken = req.cookies.refreshToken;

    if (!incomingRefreshtoken || !newPassword || !confirmPassword) {
        throw new ApiError(400, "Token and password are required");
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Password changed successfully"
            )
        );

    } catch (error) {
        console.error("Reset password error:", error);
        throw new ApiError(401, "Invalid or expired refresh token");
    }
});


export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    checkAuth,
    getCurrentUser,
    updateAccountDetails,
    forgotPassword,
    verifyOtp,
    resetPassword
};
