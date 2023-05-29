import danhmuc from "../model/danhmuc.js";
import xe from "../model/xe.js";
import {queryData} from "../model/factoryPattern.js"
export const getHomepage= (req, res)=>{
    const query= queryData(1);
    // console.log(query.getData());
    console.log(">>>Check Factory Pattern:", typeof(query.getData()));
    // xe.getAll((result)=>{
    //     row= result;
    //     // console.log("Check row: ", row);
    //     return res.render('homePage.ejs', {dataXe: row});
    // });
}
export const getDetailXe= (req, res)=>{
    
    let id_xe= req.params.id_xe;
    // console.log(">>>Check request params", id_xe);
    xe.getDetailXeById(id_xe, (result)=> {
        // console.log(">>>Check details Xe", result);
        return res.render('detailsXe.ejs', {detailsXe: JSON.stringify(result)});
    })
   
}
