import {ObjectId} from "mongodb"
import {connDB, getDb} from "../configs/mongodb.config.js";

let db;

connDB((err) => {
    if (!err) {
        db = getDb();
    }else{
        console.log(`DB connection error: ${err}`);
    }
})
export async function getAll(collection){
    try{
        const all  = db.collection(collection)
        let result
        if(collection==="models") {
            result = await all.find({}, {projection: {name_model: 1}})
        }else {result = await all.find()}
        return  result.toArray()
    }catch(err) {
        return err
    }
}
export async function findID(collection, id){
    try {
        const one = db.collection(collection)
        return await one.findOne({_id: new ObjectId(id)})
    }catch(err) {return err}

}
export async function addOne(collection, data){
    try{
        data.time_create = new Date()
        const one = db.collection(collection)
        await one.insertOne(data)
    }catch(err) {
        return err
    }
}
export async function delOne(collection, id){
    const one  = db.collection(collection)
    return await one.deleteOne({_id: new ObjectId(id)})
}


export async function updModel(id, data){
    data.last_update = new Date()
    const models = db.collection("models")
    return await models.updateOne({_id: new ObjectId(id)}, { $set: data})
}
export async function delApiKey(apikey){
    try {
        const myApiKey = await db.collection("users").findOne({'apikey': apikey})
        console.log(myApiKey)
        if(myApiKey){
           return await db.collection("users").deleteOne({'apikey': apikey})
        }
        else{return null}
    }catch (err){return err}
}
export async function getApiKey(){
    const keys = []
    let apiKey = await getAll("users")
    apiKey.forEach((el) => {keys.push(el.apikey)})
    if(keys){
        return keys
    }else {
        return null
    }
}
