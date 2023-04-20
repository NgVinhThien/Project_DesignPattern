import user from '../model/user.js';
import bodyParser from 'body-parser';
export const signUp=(req, res)=>{
    console.log("called to sign up");
    const {ho_ten, email, password}= req.body;
    // const ho_ten= req.body.username;
    // const email= req.body.email;
    // const password= req.body.password;
    // res.send({ho_ten: ho_ten, email: email, password: password})
    console.log(req.body);
    const newUser= new user({ho_ten, email, password});
    // user.save(function(){});
    // console.log('new user', newUser);
    return res.status(201).json({success: true});
};
export const signIn=(res, req)=>{
    console.log("called to sign in");
};
export const secret=(res, req)=>{
    console.log("called to secret");
};
