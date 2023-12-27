import multer from "multer";

const storage = multer.memoryStorage(); // instance will be deleted after file is used

const singleUpload = multer({ storage }).single("file");// "file" can be access with req.file( single parameter must be same)

export default singleUpload;