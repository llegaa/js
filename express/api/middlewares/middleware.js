import helmet from 'helmet';
import morgan from 'morgan';
export const myHelmet = helmet()
export const myMorgan = morgan('dev')
export function validateInput(req, res, next)  {
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);
    if (containsSpecialChars) return res.send(400, "Неправильные данные");
    next();
}
export function authorizationApi(req, res, next){
    if(req.headers["apikey"]!== "ddddd") return res.send(400, "Неправильный ключ")
    next();
}
export function badURL(req, res){
    res.send(400,"Такой страницы не существует")
}
