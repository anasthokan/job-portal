import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "employer","admin"], required: true },
  headline: { type: String },
  skills: [String],
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  resume: { type: String } // URL of uploaded resume/PDF
});


export default mongoose.model("User",userSchema);