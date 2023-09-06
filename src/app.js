import Express from "express";
import mongoose from "mongoose";
import handlebards from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import usersViewRouter from './routes/users.views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import __dirname from "./utils.js";
import session from "express-session";
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.engine("handlebars", handlebards.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(Express.static(__dirname + "/public"))

app.use(session({
    //store: new fileStorage({path: __dirname + "/sessions",ttl: 15, retries:0}),
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/clase19?retryWrites=true&w=majority",
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}, //No darle mucha bola, son configuraciones de forma de escritura
        ttl: 10 
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

app.use("/",viewRouter)
app.use("/users",usersViewRouter)
app.use("/api/sessions",sessionsRouter)
const SERVER_PORT = 8080
app.listen(SERVER_PORT,(req,res)=> {
    console.log("Escuchando desde puerto")
})
const connectMongoDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/clase19?retryWrites=true&w=majority")
        console.log("Conectado a la BD")
    } catch (error) {
        console.error("No se pudo conectar" + error)
        process.exit()
    }
}
connectMongoDb()