import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const sendEmail = async (email, subject, message) => {
    try {
        // Configure the email transport (SMTP server)
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,  
            port: process.env.EMAIL_PORT,
            secure: false, // TLS (use true if using port 465)

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define the email details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
        };

        const sendMailResponse = await transporter.sendMail(mailOptions);
        if (!sendMailResponse) {
            throw new ApiError(400, "Something went wrong while sending OTP");
        }

        return new ApiResponse(200, {}, "Email sent successfully!"); 

    } catch (error) {
        console.error("Email Error:", error);
        throw new ApiError(400, "Failed to send email");
    }
};

export { sendEmail };
