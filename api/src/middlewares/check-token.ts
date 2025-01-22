import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types';

const checkTokenMiddleware = (req: UserRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as { userId: string };
        req.user = { userId: decoded.userId };
        next();
        return;
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
        return;
    }
};

export default checkTokenMiddleware;
