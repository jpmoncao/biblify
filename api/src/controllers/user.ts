import IUser from "../interfaces/user";
import User from "../models/user";

const saveUser = async (data: IUser): Promise<IUser> => {
    const user = new User(data);
    const savedUser: IUser = await user.save();
    return savedUser;
}

const listUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find({});
    return users;
}

export { saveUser, listUsers }