import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }],
    
});

export const Teacher = mongoose.model("Teacher", TeacherSchema);