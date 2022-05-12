import { customAlphabet } from 'nanoid';

export const nanoid = (count: number = 15) => {
    return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz_", 10)(count);
}