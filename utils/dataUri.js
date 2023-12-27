import DataURIParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) =>{
    const parser = new DataURIParser();
    const extensionName = path.extname(file.originalname).toString();
    
    console.log(extensionName);
    return parser.format(extensionName,file.buffer);
}

export default getDataUri;