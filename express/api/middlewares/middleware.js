import helmet from 'helmet';
import morgan from 'morgan';
import {getApiKey} from "../../services/service.js";

const error = new Error("Ошибка")
export const myHelmet = helmet()
export const myMorgan = morgan('dev')
export function validateInput(req, res, next)  {
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);
    if (containsSpecialChars) return res.send(400, "Неправильные данные");
    next();
}
export async function authorizationApi(req, res, next){
    try {
        const keys = await getApiKey()
        if (keys) {
            if (!keys.includes(req.headers["apikey"]) && req.method !== "GET" && req.url !== "/login") {
                return res.status(400).send('access denied')
            }
            else{
                next()
            }
        }else{
            res.send('not apikey in databases')
        }
    }catch (e){next(e)}
}

export function badURL(req, res){
    res.send(400,"Такой страницы не существует")
}

export async function err(err, req, res, next){
    err.status = 500
    res.status(err.status).send(err.message)
}
