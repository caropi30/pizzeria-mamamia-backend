import mongoose from "mongoose"

process.loadEnvFile();

const MONGO = process.env.MONGO;

mongoose.connect(MONGO)
    .then(() => console.log('Conectado con éxito'))
    .catch((error) =>{
        throw Error(`Error al conectarse con la base de datos ${error}`)
    } )