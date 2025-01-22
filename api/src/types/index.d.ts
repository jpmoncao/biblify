import { Request } from "express";

interface UserRequest<P = {}> extends Request<P> {
    user?: {
        userId: string;
    };
}

export { UserRequest };
