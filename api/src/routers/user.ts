import { Request, Response, Router } from "express"
import IUser from "../interfaces/user";
import { saveUser, listUsers, loginUser, validateToken, listUserById } from "../controllers/user";

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

userRouter.post('/token', async (req: Request, res: Response) => {
    try {
        const { token }: { token: string } = req.body;

        const tokenIsValid = await validateToken(token);

        if (!tokenIsValid) {
            const error = new Error("Invalid token");
            error.name = "TokenValidationError";
            throw error;
        }

        res.status(201).json({ data: { tokenIsValid }, message: 'User token is valid!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

// Read
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await listUsers();

        res.status(201).json({ data: users, message: 'Users sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

userRouter.get('/id/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await listUserById(userId);

        res.status(201).json({ data: user, message: 'User sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

export default userRouter;