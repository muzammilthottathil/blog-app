import Post from "../model/post.js";

export const createPost = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send({ error: "Unauthorized" });
    }

    try {
        const post = new Post(req.body);
        const postObj = await post.save();

        return res.status(200).json({ msg: "Post created successfully", id: postObj?._id });
    } catch (error) {
        return res.status(500).json({ msg: "Error While creating post" });
    }
};

export const updatePost = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send({ error: "Unauthorized" });
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
        return res.status(200).json({ msg: "Post updated successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error While getting posts" });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ msg: "Error While getting posts" });
    }
};

export const getAllPosts = async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    try {
        const posts = await Post.find().sort({ createdAt: "desc" }).skip(skip).limit(6);
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ msg: "Error While getting posts" });
    }
};

export const deletePost = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send({ error: "Unauthorized" });
    }

    try {
        await Post.deleteOne({ _id: req.params.id });
        return res.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error While getting posts" });
    }
};
