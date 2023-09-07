import { Router } from "express";

const router = Router()
router.get("",(req,res)=> {
    res.render("index")
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