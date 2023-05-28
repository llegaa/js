import handlers from './api/v3/api.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc";
import {
    authorizationApi, badURL,
    myHelmet, myMorgan,
    err, originHeaderMiddleware
} from "./api/middlewares/middleware.js";


const app = express()

const port = 8000
const host = '127.0.0.1'
const hosting = `http://${host}:${port}`

const __dirname = path.resolve()

app.use(myMorgan)

app.use(myHelmet)

app.use(bodyParser.json());

app.use(originHeaderMiddleware);

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/v3', authorizationApi, handlers)

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
                url: `/api/v3`
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
        host: "http://127.0.0.1:8000"
    },
    apis: ['api/v3/documentations.yaml']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(badURL)
app.use(err)
app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`)
})