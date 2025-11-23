const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.static(__dirname + "public"));
app.use(express.json());

//Configurar EJS:
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Rutas:
app.get("/", (req, res) => {
    res.render("inicio.ejs");
})
//Crear servicio:
app.use("/servicios", require("./v1/routes/crear-servicio.route"));
//Obtener todos los servicios:
app.use("/servicios", require("./v1/routes/get-servicios.route"));
//Obtener un servicio por ID:
app.use("/servicios/:id", require("./v1/routes/get-servicio-id.route"));
//Actualizar un servicio:
app.use("/servicios/:id", require("./v1/routes/modificar-servicio-id.route"));
//Eliminar un servicio:
app.use("/servicios/:id", require("./v1/routes/eliminar-servicio-id.route"));

app.listen(port, () => {
    console.log(`A la escucha del puerto ${port}`);
})