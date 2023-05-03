import handlers from './api/v3/api.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express"
import {authorizationApi, badURL, myHelmet, myMorgan, err, swaggerDocs} from "./api/middlewares/middleware.js";

const app = express()

const port = 8000
const host = '127.0.0.1'
const hosting = `http://${host}:${port}`

const __dirname = path.resolve()

app.use(myMorgan)

app.use(myHelmet)
//
app.use(bodyParser.json());
//
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/v3', authorizationApi, handlers)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(badURL)
app.use(err)
//
app.listen(port, host, () => {
 console.log(`Server starting on ${hosting}`)
 })