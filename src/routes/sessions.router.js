import {Router} from 'express'
import userModel from '../models/user.model.js'
const router = Router()

router.post("/register",async (req,res)=> {
        const {first_name,last_name,email,age,password} = req.body
        console.log("Registrando user")
        console.log(req.body)
    
        const exists = await userModel.findOne({email})
        if(exists) {
            res.status(400).send({status:"error",message:"Usuario ya existe"})
        }
        const user = {
            first_name,
             last_name,
             email,
            age,
            password
        } // Se encripta despues
        const result = await userModel.create(user)
        res.send({status:"succes",message:"Usuario creado con exito con ID: "+result.id})
    

})
router.post("/login",async (req,res)=> {
    const {email,password} = req.body
    const user = await userModel.findOne({email,password})
    if(!user) {
        return res.status(401).send({status:"error",message:"Credenciales incorrectas"})
    } 
    //damos de alta la sesion
    req.session.user = {
        name: user.first_name + user.last_name,
        email: user.email,
        age: user.age
    }
    res.send({status:"succes",payload: req.session.user, message:"Primero logueo"})
})
router.get("/logout",(req,res)=> {
    req.session.destroy(error => {
        if(error) {
            res.json({error:"Error en logout", msg: "Error al cerrar"})
        }
        res.status(200).send("Sesion cerrada")
    })
})

export default router