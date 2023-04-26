import {connDB, getDb} from "../configs/mongodb.config.js";
import {getAll, findID, addOne, delOne, updModel, getApiKey, delApiKey} from "../services/service.js";
import {ObjectId} from 'mongodb'

export async function getMainText(req,res){
    res.status(200).send("hello")
}
export async function postAddComments(req, res){
    const data = req.body;

    if (data.name && data.text){

        addOne("comments", data).then(() => {
            res.status(200).send("data send")
        })
    }else{
        res.status(400).send("Error: No data input")
    }
}

export async function getComments(req, res){
    res.status(200).send(await getAll(comments))
}

export async function getMyComments(req, res){
    if (ObjectId.isValid(req.params.id)){
        const result = await findID(comments, req.params.id)
        res.status(200).send(result)
    }else{
        res.status(400).send("id param is not valid")
    }
}

export async function getModels(req, res){
    res.status(200).send(await getAll("models"))
}
export async function addModels(req, res){
    const data = req.body;
    if (data.name && data.name_model && data.type && data.model && data.description && data.comments){
        await addOne("models", data)
        res.send("data send")
    }
    else res.status(400).send("Error: No data send")
}
export async function findModel(req, res){
    if (ObjectId.isValid(req.params.id)){
        const result = await findID(models, req.params.id)
        res.status(200).send(result)
    }else{
        res.status(400).send("id param is not valid")
    }
}
export async function deleteModel(req, res){
    if (ObjectId.isValid(req.params.id)){
        await delOne(models, req.params.id)
        res.status(200).send("Model delete")
    }else{
        res.status(400).send("id param is not valid")
    }
}
export async function updateModel(req,res){
    const data = req.body;
    if (ObjectId.isValid(req.params.id)){
        if (data.nameUser || data.nameModel || data.type || data.model || data.description || data.comments){
        await updModel(req.params.id,data).then(() => {
            res.status(200).send("data update")
        })}
    }else{
        res.status(400).send("Error: No data update")
    }
}
export async function addUser(req, res){

    const data = req.body;

    if (data.name){
        const number = Math.floor(Math.random() * 1000);
        const apikey = data.name + number
        const result = {
            "name": data.name,
            "apikey": apikey}


        addOne("users", result).then(() => {
            res.status(200).send("data send")
        })
    }else{
        res.status(400).send("Error: No data input")
    }
}
export async function deleteUser(req, res){
    const apikey = req.headers["apikey"]
    const apiKey = await getApiKey()
    if(apiKey.includes(apikey)){
        if(await delApiKey(apikey)){
            res.status(200).send("Api ключ удален")
        }
        else{res.status(400).send("Ключ не найден")}

    } else{res.status(400).send("Ключ не найден")}
}
