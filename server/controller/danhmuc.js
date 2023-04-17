import danhmuc from '../model/danhmuc.js';
export const getDanhMuc= (req, res)=>{
    danhmuc.getAll((data)=>{
        res.send(data);
    });
   
}
