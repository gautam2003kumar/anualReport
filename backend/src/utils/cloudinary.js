import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
});

const uploadOncloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) null

        const respose = await cloudinary.uploader.upload(localFilePath, 
            {
                resource_type: "auto"
            }
        )

        console.log("File is uploaded on cloudinary", respose.url);

        return respose
    }catch(error){
        fs.unlinkSync(localFilePath) // remove the file from ourServer when upload is failed on cloudinary
        return null
    }
}