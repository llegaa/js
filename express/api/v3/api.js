import {Router} from "express";
import {getMainText,
    getModels,
    getComments,
    postAddComments,
    getMyComments,
    findModel, addModels, updateModel, deleteModel,  addUser, deleteUser
} from '../../controllers/controller.js'
import {validateInput} from "../middlewares/middleware.js";



const handlers = Router()

 handlers.get('/', getMainText)
 handlers.get('/comments/:id', getMyComments)
 handlers.get('/comments', getComments)
 handlers.get('/models', getModels)
 handlers.get('/models/:id', findModel)

 handlers.post('/comments', postAddComments)
 handlers.post('/models', addModels)

 handlers.put('/models/:id',updateModel )
 handlers.delete('/models/:id', deleteModel)

 handlers.post('/login', addUser)
 handlers.delete('/account/delete', deleteUser)
export default handlers