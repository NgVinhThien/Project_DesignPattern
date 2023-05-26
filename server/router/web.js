import express from "express";
import { getHomepage, getDetailXe } from "../controller/homePage.js";
const router= express.Router();

router.get('/web/home', getHomepage);
router.get('/web/details/xe/:id_xe', getDetailXe);
export default router;