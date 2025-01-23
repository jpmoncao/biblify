import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import IUser from "../interfaces/user";
import User from "../models/user";

const saveUser = async (data: IUser): Promise<IUser> => {
    data.password = await bcrypt.hash(data.password, 8);

    const user = new User(data);
    const savedUser: IUser = await user.save();
    return savedUser;
}

const listUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find({});
    return users;
}

const listUserById = async (userId: string): Promise<IUser | null> => {
    const user = await User.findOne({ userId });
    if (!user)
        return null
    return user;
}

const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ email });

    if (!user)
        throw new Error("User not found");

    if (!(await bcrypt.compare(password, user.password)))
        throw new Error("Invalid password");

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET ?? "",
        { expiresIn: "60d" }
    );

    return token;
}

const validateToken = async (token: string): Promise<boolean> => {
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? '') as { userId: string };

        return userId.trim() !== "";
    } catch (error) {
        return false;
    }
}

export { saveUser, listUsers, loginUser, validateToken, listUserById }