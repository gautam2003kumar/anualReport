import { User } from "../models/user.model.js"
import { ApiError } from "./ApiError.js";

const setAdmin = async () =>{

    try {
        const existingAdmin = await User.findOne({isAdmin: true});

        if(!existingAdmin){
            const adminUser = new User({
                username: "gkishor03",
                fullName: "Gautam Kumar",
                email: "gautamkishor09072003@gmail.com",
                password: "Kumar@12345",
                isAdmin: true,
            });

            await adminUser.save();

            console.log(`Admin user created: ${adminUser.email} | Password: ${adminUser.password}`);
        }else{
            console.log("Admin already exists");
        }
    } catch (error) {
        console(error);
        throw new ApiError(404, "Error setting admin:");
    }
}

export {setAdmin}