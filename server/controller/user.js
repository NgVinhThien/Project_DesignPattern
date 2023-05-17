import user from '../model/user.js';
import _JWT from '../common/_JWT.js';


export const signIn=(req, res)=>{
    var data= req.body;
    user.signIn(data,async function(result){
        if(result != false){
          const _token= await _JWT.make(result);
          res.status(200).send({success: true, token: JSON.stringify(_token), khach_hangs: result});
        }
        else{
          res.status(404).json({message: 'Đăng nhập không thành công'});
        }
    })
};
export const signUp = (req, res) => {
  const data = req.body;
  user.findUser(data, function (ressult){
    console.log(ressult);
    if(ressult == 0){
      user.signUp(data, (result)=>{
        if(result)  res.status(200).send({message: 'Đăng ký thành công'});
        
        else res.status(404).send({message: 'Đăng ký không thành công'})
      })
    }
    else res.status(404).send({message: 'Tài khoản đã tồn tại'});
  }) 
};
export const secret=(res, req)=>{
    console.log("called to secret");
};




