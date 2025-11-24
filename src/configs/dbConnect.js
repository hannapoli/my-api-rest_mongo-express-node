const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const dbConnect = async () => {
    try {
        const response = await mongoose.connect(uri);
        return response;
    } catch (error) {
        throw {
            ok: false,
            message: "Error: no se ha podido conectar con la base de datos."
        }
    }
}

module.exports = dbConnect;