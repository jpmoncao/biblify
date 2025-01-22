interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: NativeDate;
}

export default IUser;
