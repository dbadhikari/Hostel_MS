import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// ================================
// 👤 REGISTER USER (ONLY BASIC INFO)
// ================================
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "applicant",
      status: "pending",
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// 📥 verifyEmail
// ================================

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    user.emailVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================================
// 📥 resendVerification Email
// ================================

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    // send email here

    res.status(200).json({
      message: "New OTP sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================================
// 📥 GET ALL USERS (ADMIN)
// ================================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================================
// 🔍 GET USER BY ID
// ================================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================================
// ✏️ UPDATE USER (FULL PROFILE AFTER RESIDENT)
// ================================
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================================
// ❌ DELETE USER
// ================================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// ================================
// 🔐 LOGIN USER
// ================================



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }
      if (!user.emailVerified) {
        return res.status(400).json({
          message: "Please verify your email first"
        });
      }

    // 3. Generate token (from utility)
    const token = generateToken(user);

    // 4. Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};