import helmet from 'helmet';
import morgan from 'morgan';
import {getApiKey} from "../../services/service.js";
import swaggerJsDoc from "swagger-jsdoc";

export const myHelmet = helmet()
export const myMorgan = morgan('dev')

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

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Documentations",
            version: "1.0.0",
            contact: {
                name: "llega",
            },
        },
        servers: [
            {
                url: `http://127.0.0.1:8000/api/v3`
            },
        ],
        tags:[
            {
                name: "API",
                description: "create and delete apikey",
            },
            {
                name: "Models",
                description: "CRUD in models",
            },
            {
                name: "Comments",
                description: "CRUD in comments",
            },
            {
                name: "Home",
                description: "Home page",
            },
        ],
    },
    apis: ['api/v3/documentations.yaml']
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions)