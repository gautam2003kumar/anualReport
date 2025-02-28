const extractPublicIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1].split(".")[0]; // Extracts the file name without extension
};

const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log("Old file deleted from Cloudinary:", publicId);
    } catch (error) {
        console.error("Error deleting old file from Cloudinary:", error);
    }
};
