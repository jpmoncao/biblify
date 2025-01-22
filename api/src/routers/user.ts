import { Request, Response, Router } from "express"
import IUser from "../interfaces/user";
import { saveUser, listUsers, loginUser } from "../controllers/user";

const userRouter = Router();

// CRUD routes
// Create
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, password }: IUser = req.body;

        const savedUser = await saveUser({ name, email, password });

        res.status(201).json({ data: savedUser, message: 'User sucessfully created!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password }: IUser = req.body;

        const token = await loginUser(email, password);

        res.status(201).json({ data: { token }, message: 'User sucessfully login!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

// Read
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await listUsers();

        res.status(201).json({ data: users, message: 'User sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

export default userRouter;