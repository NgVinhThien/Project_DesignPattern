import user from '../model/user.js';
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
    user.signIn(data, function(respose){
        res.send({result: respose});
    })
};
export const secret=(res, req)=>{
    console.log("called to secret");
};
