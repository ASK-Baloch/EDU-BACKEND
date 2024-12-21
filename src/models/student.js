import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profile: {
      contactDetails: { type: String },
      photo: { type: String },
    },
    attendance: [
      {
        date: { type: Date },
        status: { type: String, enum: ['present', 'absent'] },
      },
    ],
    grades: [
      {
        subject: { type: String },
        grade: { type: String },
      },
    ],
    timetable: [
      {
        subject: { type: String },
        time: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);