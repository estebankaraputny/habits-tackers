export interface User {
    id: number;
    username: string;
    email:string;
    roles?: Role[];
};

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}