import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token) return next(errorHandler(401,'Invalid User'));

    jwt.verify(token,'abhinav', (err,user) => {
        if(err) return next(errorHandler(403,'token not valid'));
        
        req.user = user;
        next();
    });
};