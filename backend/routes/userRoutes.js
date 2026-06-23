import express from "express";

import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} from "../controller/userController.js"

const userRouter = express.Router();


// ================================
// 🔐 AUTH ROUTES
// ================================
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


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


export default userRouter;