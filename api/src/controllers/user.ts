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

export { saveUser, listUsers, loginUser }