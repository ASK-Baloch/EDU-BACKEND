import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profile: {
      contactDetails: { type: String },
      photo: { type: String },
    },
    courses: [
      {
        courseName: { type: String },
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Teacher', teacherSchema);