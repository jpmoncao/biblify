import { Router } from "express"
import IUser from "../interfaces/user";
import { saveUser, listUsers } from "../controllers/user";

const userRouter = Router();

// CRUD routes
// Create
userRouter.post('/', async (req, res) => {
    try {
        const { name, email }: IUser = req.body;

        const savedUser = await saveUser({ name, email });

        res.status(201).json({ data: savedUser, message: 'User sucessfully created!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

// Read
userRouter.get('/', async (req, res) => {
    try {
        const users = await listUsers();

        res.status(201).json({ data: users, message: 'User sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

export default userRouter;