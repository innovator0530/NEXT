import bcrypt from 'bcrypt';
import { randomFillSync } from "crypto"

const saltRounds = 10;

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
}

export const validatePasswordHash = (password: string, passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash);
}

export const validatePasswordPolicy = (password: string): boolean => {
    return password.length >= 8;
}

export const passwordPolicyMessage = "Password must be at least 8 characters in length, contain at least 1 lowercase letter, 1 uppercase letter and one number";

export const generateVerficationToken = (): string => {
    const buf = Buffer.alloc(30);
    const verificationToken = randomFillSync(buf).toString('hex');
    return verificationToken;
}