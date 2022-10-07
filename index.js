import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

import userRoutes from "./routes/users.js";

// // Membuat folder
// const dirPath="./data";
// if(!fs.existsSync(dirPath)){
//     fs.mkdirSync(dirPath)
// }

const dataPath="./data.json";
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, "[]", "utf-8");
}

const app=express();
const PORT=8080;
	
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.get("/",(req,res) => res.send(`Hello from Homepage.`));

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
})    