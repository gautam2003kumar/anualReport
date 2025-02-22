import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt  from "jsonwebtoken";


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
    secure: true,
    sameSite: "Strict"
}

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    console.log("Request body:", req.body);

    const { fullName, email, username, password } = req.body;

    console.log({ fullName, email, username, password });

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

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
};
