import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOncloudinary, extractPublicIdFromUrl, deleteFromCloudinary} from "../utils/cloudinary.js";
import { Report } from "../models/report.model.js";
import fs from "fs";

const getAllReport = asyncHandler(async (req, res, next) => {
    try {
        // Fetch all reports from the database
        const reports = await Report.find().sort({ createdAt: -1 }); // Sort by newest first

        if (!reports || reports.length === 0) {
            return next(new ApiError(404, "No reports found"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, reports, "Reports fetched successfully"));

    } catch (error) {
        console.error("Error in getAllReport:", error);
        next(new ApiError(500, "Internal Server Error"));
    }
});

const publishReport = asyncHandler(async (req, res, next) => {
    try {
        const { session } = req.body;
        console.log("Session:", session);
        
        if (!session) {
            return next(new ApiError(400, "Session is required"));
        }

        const reportFileArray = req.files?.reportFile;
        if (!reportFileArray || !reportFileArray[0]?.path) {
            return next(new ApiError(400, "Report file is required"));
        }

        const reportLocalPath = reportFileArray[0].path;

        // Upload to Cloudinary
        const reportFile = await uploadOncloudinary(reportLocalPath);
        if (!reportFile) {
            return next(new ApiError(500, "Failed to upload report file"));
        }

        console.log("Report uploaded successfully:", reportFile.url);

        // Delete local file safely
        fs.unlink(reportLocalPath, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });

        // Save the report in the database
        const report = await Report.create({
            session,
            reportFile: reportFile.url
        });

        if (!report) {
            return next(new ApiError(500, "Failed to save report"));
        }

        return res
            .status(201)
            .json(new ApiResponse(201, report, "Report published successfully"));

    } catch (error) {
        console.error("Error in publishReport:", error);
        next(new ApiError(500, "Internal Server Error"));
    }
});

const updateReport = asyncHandler(async (req, res, next) => {
    try {
        const { reportId } = req.params; // Extract report ID
        const { session } = req.body;

        // Find the existing report
        const existingReport = await Report.findById(reportId);
        if (!existingReport) {
            return next(new ApiError(404, "Report not found"));
        }

        let updatedReportFile = existingReport.reportFile; // Keep the existing file if no new file is provided

        // Check if a new file is uploaded
        const reportFileArray = req.files?.reportFile;
        if (reportFileArray && reportFileArray[0]?.path) {
            const reportLocalPath = reportFileArray[0].path;

            // Upload new report to Cloudinary
            const newReportFile = await uploadOncloudinary(reportLocalPath);
            if (!newReportFile) {
                return next(new ApiError(500, "Failed to upload new report file"));
            }

            updatedReportFile = newReportFile.url; // Update report file URL

            console.log("New report file uploaded:", updatedReportFile);

            // Delete old file from Cloudinary (assuming Cloudinary URL structure)
            const oldFilePublicId = extractPublicIdFromUrl(existingReport.reportFile);
            if (oldFilePublicId) {
                await deleteFromCloudinary(oldFilePublicId);
            }

            // Delete the local uploaded file
            fs.unlink(reportLocalPath, (err) => {
                if (err) console.error("Error deleting local file:", err);
            });
        }

        // Update report in the database
        existingReport.session = session || existingReport.session; // Update session if provided
        existingReport.reportFile = updatedReportFile;
        await existingReport.save();

        return res
            .status(200)
            .json(new ApiResponse(200, existingReport, "Report updated successfully"));

    } catch (error) {
        console.error("Error in updateReport:", error);
        next(new ApiError(500, "Internal Server Error"));
    }
});

const deleteReport = asyncHandler(async (req, res, next) => {
    try {
        const { reportId } = req.params; 
          
        // Find the existing report
        const report = await Report.findById(reportId);
        if (!report) {
            return next(new ApiError(404, "Report not found"));
        }

        // Extract public ID from Cloudinary URL
        const publicId = extractPublicIdFromUrl(report.reportFile);
        if (publicId) {
            await deleteFromCloudinary(publicId);
        }

        // Delete the report from the database
        await Report.findByIdAndDelete(reportId);

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Report deleted successfully"));

    } catch (error) {
        console.error("Error in deleteReport:", error);
        next(new ApiError(500, "Internal Server Error"));
    }
});

export{
    getAllReport,
    publishReport,
    updateReport,
    deleteReport,
}