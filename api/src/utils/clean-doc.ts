export default function cleanDoc<T extends object>(doc: T): Omit<T, '_id' | '__v'> {
    const { _id, __v, ...rest } = doc as any;
    return rest;
}