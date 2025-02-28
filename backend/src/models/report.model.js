import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

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
        }
    },
    {
        timestamps: true
    }
)

reportSchema.plugin(mongooseAggregatePaginate)

export const Report = mongoose.model("Report", reportSchema)