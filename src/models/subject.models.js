import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
});

export const Subject = mongoose.model("Subject", SubjectSchema);