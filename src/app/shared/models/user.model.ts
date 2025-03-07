export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    isActive: boolean;
    idRole: number;
    token: string;
}