import user from '../model/user.js';
import _JWT from '../common/_JWT.js';
export const signUp=(req, res)=>{
    console.log("called to sign up");
    // const {ho_ten, dia_chi, sdt, email, username, password}= req.body;
    // const data = new user({ho_ten, dia_chi, sdt, email, username, password});
    // user.signUp((data, result)=>{
    //     if(err){
    //         result(null);
    //     }
    //     else{
    //         return res.status(201).json({success: true});
    //     }
        
    // })
   
};
export const signIn=(req, res)=>{
    console.log("called to sign in");
    var data= req.body;
    user.signIn(data,async function(result){
        if(result !=0){
            const _token= await _JWT.make(result);
            res.send({user: _token});
        }
        else{
            res.send({message: "Tài khoản hoặc mật khẩu không đúng"})
        }
    })
};
export const secret=(res, req)=>{
    console.log("called to secret");
};
