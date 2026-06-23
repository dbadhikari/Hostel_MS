import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔐 Basic Account
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

    phone: {
      type: String,
      required: true
    },

    // 🔑 Role & Status
    role: {
      type: String,
      enum: ["admin", "applicant", "resident"],
      default: "applicant"
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    // 📧 Email Verification
    emailVerified: {
      type: Boolean,
      default: false
    },

    verificationToken: {
      type: String
    },

    // 👤 Personal Info
    dateOfBirth: {
      type: Date
    },

    occupation: {
      type: String
    },

    // 🏠 Address
    address: {
      type: String
    },

    city: {
      type: String
    },

    district: {
      type: String
    },

    // 👨‍👩‍👦 Guardian Info
    guardianName: {
      type: String
    },

    guardianPhone: {
      type: String
    },

    // 🚨 Emergency Contact
    emergencyContactName: {
      type: String
    },

    emergencyContactPhone: {
      type: String
    },

    emergencyRelation: {
      type: String
    },

    // 🪪 Documents
    documentType: {
      type: String // citizenship / passport / ID
    },

    documentNumber: {
      type: String
    },

    documentFrontImage: {
      type: String
    },

    documentBackImage: {
      type: String
    },

    // 📸 Profile Image
    profileImage: {
      type: String
    },

    // 🏠 Hostel Info (only if resident)
    allocatedRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null
    },

    bedNumber: {
      type: Number,
      default: null
    },

    joinedDate: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);