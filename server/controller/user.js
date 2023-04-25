import user from '../model/user.js';
import _JWT from '../common/_JWT.js';
export const signIn=(req, res)=>{
    console.log("called to sign in");
    var data= req.body;
    user.signIn(data,async function(result){
        if(result !=null){
            // const _token= await _JWT.make(result);
            // res.send({user: _token});
            // const objToSend= {
            //   id: result.id, 
            //   ho_ten: result.ho_ten,

            // }
            res.status(200).send(JSON.stringify(result));
        }
        else{
            res.status(404).send();
        }
    })
};
export const signUp = (req, res) => {
  const data = req.body;
  console.log('Call to sign up');

  // user.signUp(data, (err, result) => {
    

    // if (err) {
    //   res.send({ message: err });
    // } else {
    //   res.send({ message: 'Đăng ký thành công' });
    // }
  // });
};
export const secret=(res, req)=>{
    console.log("called to secret");
};




