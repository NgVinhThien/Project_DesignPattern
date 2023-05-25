import express from "express";
import { getHomepage } from "../controller/homePage.js";
const router= express.Router();

router.get('/home', getHomepage);

export default router;