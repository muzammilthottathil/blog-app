import grid from "gridfs-stream";
import mongoose from "mongoose";

let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos",
    });

    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "File not Found" });
    }

    const imageUrl = `http://localhost:8000/file/${req.file.filename}`;

    return res.status(200).json({ imageUrl });
};

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readstream = gridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
