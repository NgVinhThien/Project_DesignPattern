import danhmuc from '../model/book.js';
export const getPosts= (req, res)=>{
    danhmuc.getAll((data)=>{
        res.send(data);
    });
   
}
// export const addBook= (req, res)=>{
//     var data= req.body;
//     book.create(data, function(response){
//         res.send({result: response});
//     });
// }