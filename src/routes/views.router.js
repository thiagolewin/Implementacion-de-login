import { Router } from "express";

const router = Router()
router.get("",(req,res)=> {
    res.render("index")
})
router.get("/session",(req,res)=> {
    if(req.session.counter) {
        req.session.counter++
        res.send("Se ha visitado este sitio " + req.session.counter + " veces")
    } else {
        req.session.counter = 1
        res.send("Bienvenido")
    }
})
router.get("/logout",(req,res)=> {
    req.session.destroy(error => {
        if(error) {
            res.json({error:"Error en logout", msg: "Error al cerrar"})
        }
        res.send("Sesion cerrada")
    })
})
router.get("/login",(req,res)=> {
    const {username, password} = req.query
    if (username != "pepe" || password !== "123qwe") {
        return res.status(401).send("Login failed, check ur username and password")
    } else {
        req.session.user = username
        req.session.admin = true
        res.send("Login succes")
    }
})
function auth(req,res, next) {
    if (req.session.admin == true) {
        return next()
    } else {
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso")
    }
}
router.get("/private", auth, (req,res)=> {
    res.send("Si estas viendo esto es porque sos admin")
})
export default router