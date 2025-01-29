import express from "express";
import path from "path";

const app = express();

app.get('/', (req,res) => {
    res.sendFile(path.resolve('chat.html'));
});
    
app.listen(1111, () => {
    console.log("Server is running at 1111");
    
})  