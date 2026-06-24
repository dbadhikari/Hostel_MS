import express from "express";

import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  verifyEmail,
resendVerification,
} from "../controller/userController.js"

const userRouter = express.Router();


// ================================
// 🔐 AUTH ROUTES
// ================================
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

// ================================
// 👤 USER CRUD ROUTES
// ================================

// Get all users (Admin only in future)
userRouter.get("/", getAllUsers);

// Get single user by ID
userRouter.get("/:id", getUserById);

// Update user (full profile update)
userRouter.put("/:id", updateUser);

// Delete user
userRouter.delete("/:id", deleteUser);

userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-verification", resendVerification);

export default userRouter;