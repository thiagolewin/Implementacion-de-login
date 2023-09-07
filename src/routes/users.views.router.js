import {Router} from "express";
const router = Router()

router.get("/login",(req,res)=> {
    if(req.session.user == undefined) {
        res.render("login")
    } else {
        res.redirect("/")
    }
})
router.get("/register",(req,res)=> {
    if(req.session.user == undefined) {
        res.render("register")
    } else {
        res.redirect("/")
    }

})
router.get("/",(req,res)=> {
    if(req.session.user) {
        res.render("profile",{
            user: req.session.user
        })
    } else {
        res.redirect("/users/register")
    }


})

export default router