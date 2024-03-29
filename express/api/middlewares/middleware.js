import helmet from 'helmet';
import morgan from 'morgan';
import {getApiKey} from "../../services/service.js";

export const myHelmet = helmet()
export const myMorgan = morgan('dev')

export function originHeaderMiddleware(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, apikey");

    if (req.method === "OPTIONS") {
        res.status(200).send();
    }
    else {
        next();
    }
}

export function validateInput(req, res, next)  {
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);
    if (containsSpecialChars) return res.send(400, "Неправильные данные");
    next();
}

export async function authorizationApi(req, res, next) {
    const keys = await getApiKey()
    if (keys) {
        if (!keys.includes(req.headers["apikey"]) && req.method !== "GET" && req.url !== "/login") {
            return res.status(403).send('access denied')
        } else {
            next()
        }
    } else {
        res.send('not apikey in databases')
    }
}

export function badURL(req, res){
    res.status(400).send("Такой страницы не существует")
}

export async function err(err, req, res, next){
    err.status = 500
    res.status(err.status).send(err.message)
}
