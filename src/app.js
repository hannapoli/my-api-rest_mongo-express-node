const express = require("express");
require("dotenv").config();

const app = express();
const port = ProcessingInstruction.env.PORT || 3000;

//Middlewares

//Rutas:


app.listen(port, () => {
    console.log(`A la escucha del puerto ${port}`);
})