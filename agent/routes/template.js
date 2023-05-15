import { Router } from "express";
import TEMPLATES from "../data/templates.js";


const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json(TEMPLATES);
});

export default router;