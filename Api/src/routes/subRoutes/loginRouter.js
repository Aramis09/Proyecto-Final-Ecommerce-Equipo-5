const {Router}=require("express");
const { requiresAuth } = require('express-openid-connect');
const loginRouter = Router();

//isAuthenticated viene de 
loginRouter.get("/",(req,res)=>{
    if(req.oidc.isAuthenticated()){ // devuelve true si esta autenticado
        res.status(200).send('User is authenticated')
    }
    res.status(200).send('User must loggin to continue')
});

//requiresAuth() es un middleware para rutas que requieren autenticacion. Cualquier ruta que use este middleware chequeara por una session valida de usuario y si no existe redirigira al usuario al Log in.
loginRouter.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
  });



module.exports = loginRouter;