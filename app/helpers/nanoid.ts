import { customAlphabet } from 'nanoid';

export const nanoid = (count: number = 10) => {
    return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz_", 10)(count);
}