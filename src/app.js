const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./configs/dbConnect")

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//BBDD:
dbConnect()
    .then((response) => console.log('Conectado a la base de datos.'))
    .catch((error) => console.error(error));

//Configurar EJS:
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Rutas:
app.get("/", (req, res) => {
    res.render("inicio.ejs");
});

app.use("/api/v1/servicios", require("./routes/servicios.routes"));
app.use("/api/v1/auth", require("./routes/users.routes"));

app.listen(port, () => {
    console.log(`A la escucha del puerto ${port}`);
})