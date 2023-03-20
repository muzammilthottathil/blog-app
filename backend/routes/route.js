import express from "express";
import { getImage, uploadImage } from "../controller/image-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controller/post-controller.js";
import { loginUser, signupUser } from "../controller/user-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

router.post("/post/create", authenticateToken, createPost);
router.put("/post/update/:id", authenticateToken, updatePost);
router.get("/post/:id", authenticateToken, getPost);
router.get("/posts", authenticateToken, getAllPosts);
router.delete("/posts/delete/:id", authenticateToken, deletePost);

export default router;
