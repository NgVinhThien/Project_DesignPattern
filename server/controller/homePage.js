import danhmuc from "../model/danhmuc.js";

export const getHomepage= (req, res)=>{

    const dataDanhmuc=[];
    danhmuc.getAll((result)=>{
        
        console.log(">>>Check data",result);
        return res.render('homePage.ejs', {dataDanhMuc: result});
    })

    
}
