import {getAll, findID, addOne, delOne, updModel, getApiKey, delApiKey} from "../services/service.js";
import {ObjectId} from "mongodb"

export async function getMainText(req, res){
    res.status(200).send("hello")
}

export async function postAddComments(req, res, next){
    try {
        const data = req.body;
        if (data.name && data.text){
            await addOne("comments", data)
            res.send("comment create")
        }
    }catch (e) {
        next(e)
    }
}

export async function getComments(req, res, next){
    try {
        res.send(await getAll("comments"))
    }catch (e){
        next(e)
    }
}

export async function getMyComments(req, res, next){
    try {
        if (ObjectId.isValid(req.params.id)){
            const result = await findID("comments", req.params.id)
            res.status(200).send(result)
        }else{
            res.status(400).send("id param is not valid")
        }
    }catch (e){next(e)}
}

export async function getModels(req, res, next){
    try {
        let allModels = await getAll("models")
        res.status(200).send(allModels)
    }catch (e){
        next(e)
    }
}

export async function addModels(req, res, next){
    try {
        const data = req.body;
        if (data.name && data.name_model && data.type && data.model && data.descriptions && data.comments){
            await addOne("models", data)
            res.send("data send")
        }
        else res.status(400).send("Error: No data send")
    }catch (e){
        next(e)
    }
}

export async function findModel(req, res, next){
    try {
        if (ObjectId.isValid(req.params.id)){
            const result = await findID("models", req.params.id)
            res.status(200).send(result)
        }else{
            res.status(400).send("id param is not valid")
        }
    }catch (e){next(e)}
}

export async function deleteModel(req, res, next){
    try {
        if(ObjectId.isValid(req.params.id)){
            if (await delOne('models', req.params.id)){
                res.send("delete model")
            }else {
                res.status(400).send("no find model")
            }
        }else{
            res.status(400).send("no valid id")
        }
    }catch (e){next(e)}
}

export async function updateModel(req, res, next) {
    try {
        const data = req.body;
        if (ObjectId.isValid(req.params.id)) {
            if (data.name || data.name_model || data.type || data.model || data.descriptions || data.comments) {
                await updModel(req.params.id, data)
                res.status(200).send("data update")
            } else {
                res.status(400).send("Error: No data update")
            }
        }
    }catch (e){
        next(e)
    }
}

export function addUser(req, res, next){
    try {
        const data = req.body;

        if (data.name){
            const number = Math.floor(Math.random() * 1000);
            const apikey = data.name + number
            const result = {
                "name": data.name,
                "apikey": apikey
            }

            addOne("users", result).then(() => {
                res.send(`your apikey ${apikey}`)
            })
        }else{
            res.status(400).send("Error: No data input")
        }
    }catch (e){
        next(e)
    }
}

export async function deleteUser(req, res, next){
    try {
        const apikey = req.headers["apikey"]
        const apiKey = await getApiKey()
        if(!apikey.includes(apiKey)){
            if(await delApiKey(apikey)){
                res.status(200).send("Api ключ удален")
            } else{
                res.status(400).send("Ключ не найден")
            }
        }else{
            res.status(400).send("Ключ не найден")
        }
    }catch (e){
        next(e)
    }
}
