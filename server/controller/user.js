import user from '../model/user.js';
import _JWT from '../common/_JWT.js';
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
export const signUp = (req, res) => {
  const data = req.body;
  user.signUp(data, (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send({ message: 'Đăng ký thành công' });
    }
  });
};
export const secret=(res, req)=>{
    console.log("called to secret");
};




