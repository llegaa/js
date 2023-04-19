import {Router} from "express";
import {getAllStats, getMainText, getComments, postAddComments, getMyComments} from '../../controllers/comments.js'
import {validateInput} from "../middlewares/middleware.js";


const handlers = Router()

handlers.get('/', getMainText)
handlers.get('/stats', validateInput, getAllStats)
handlers.get('/comments/:id', getMyComments)
handlers.get('/comments', getComments)
handlers.post('/comments', postAddComments)


export default handlers