export const JWT_SECRET = process.env.JWT_SECRET;

export enum TokenType {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH',
}
