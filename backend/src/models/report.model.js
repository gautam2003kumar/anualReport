import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
    {
        reportFile:{
            type: String, // cloudinary url
            required: true
        },
        session:{
            type: String,
            required: true
        },

        views: {
            type: Number,
            default: 0
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Report = mongoose.model("Report", reportSchema)