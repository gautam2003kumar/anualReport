import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export { registerUser };
