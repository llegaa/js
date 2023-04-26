import helmet from 'helmet';
import morgan from 'morgan';
import {getApiKey} from "../../services/service.js";


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
    const keys = await getApiKey()
    if (keys) {
        if (!keys.includes(req.headers["apikey"]) && req.method === "GET" && req.url !== "/login") {
            return res.status(403).send('access denied')
        }
        else{
            console.log(req.method)
            next()
        }
    }else{
        res.send('not apikey in databases')
    }
}

export function badURL(req, res){
    res.send(400,"Такой страницы не существует")
}
