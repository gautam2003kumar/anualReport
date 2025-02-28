import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken?._id) {
            throw new ApiError(401, "Invalid token structure");
        }

        // Find user
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid access token: User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user;

    if(user.isAdmin !== true){
        throw new ApiError(403, "Unauthorized request: Admin access required");
    }
    next();
});


export { 
    verifyJWT,
    isAdmin
};
