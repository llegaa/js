import {Router} from "express";
import {getAllStats, getMainText, getComments} from './serves.js'
import {validateInput} from "../middlewares/middleware.js";

const router = Router()

router.get('/', getMainText)
router.get('/stats', validateInput, getAllStats)
router.post('/comments', validateInput, getComments)

export default router
