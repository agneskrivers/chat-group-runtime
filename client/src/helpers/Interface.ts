export interface AuthencationInterface {
    user: string;
    pass: string;
    fullName?: string;
}
export interface UserInterface {
    id: string;
    fullName: string;
    avatar: string;
    user: string;
    isAdmin: boolean;
}
export interface UpdateUserInterface {
    fullName: string;
    avatar?: string;
    profile?: boolean;
}
export interface ChatTextInterface {
    text: string;
    fullName: string;
    id?: string;
    avatar: string;
    idUser: string;
}
export interface ContextInterface {
    id?: string;
    user?: string;
    fullName?: string;
    avatar?: string;
    isAdmin?: boolean;
    logout: () => void;
}
export interface UserOnline {
    id: string;
    fullName: string;
    avatar: string;
}
export interface ResponseDataInterface {
    signup?: boolean;
    login?: boolean;
    message?: string;
    token?: string;
    data?: UserInterface;
}
export interface BodyDataInterface {
    user: string;
    pass: string;
    fullName?: string;
    keep?: boolean;
}
