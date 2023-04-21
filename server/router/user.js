import express from 'express';
import _jwt from '../common/_JWT.js'
import {signIn, secret,signUp} from '../controller/user.js';
const router= express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/secret', secret);

router.get('/token', async function(req, res){
    var user= {
        name: 'nguyenn',
        email: 'jkljaklg',
    };
    const _jwttoken= await _jwt.make(user);
    res.send({token: _jwttoken});
});
router.get('/token_check', async function(req, res){
    try{
        var token= "aaeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJuZ3V5ZW5uIiwiZW1haWwiOiJqa2xqYWtsZyJ9LCJpYXQiOjE2ODE5NzI4MTYsImV4cCI6MTY4MTk3NjQxNn0.eeTJPev_XqhVyKphiXtNTx-oGnVMtczoqoLHK8EobhU"
        const data= await _jwt.check(token);
        res.send({data: data});
    }
    catch(err){
        res.send({data: "Mã token không hợp lệ"});
    }
})


export default router;