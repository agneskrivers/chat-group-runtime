export interface UserInterface {
    id: string;
    fullName: string;
    avatar: string;
    user: string;
    isAdmin: boolean;
}
export interface AuthencationInterface {
    user: string;
    pass: string;
    fullName?: string;
    keep?: boolean;
}
export interface ResponseProfile {
    profile: boolean;
    fullName: string;
    avatar: string;
}
export interface verifyTokenInterface {
    (token: string, secretKey: string): Promise<object>;
}
export interface generateTokeInterface {
    (user: UserInterface, secretSignature: string, tokenLife: number): Promise<
        string
    >;
}
export interface UpdateProfileInterface {
    fullName: string;
    profile: boolean;
    avatar?: string;
}
export interface MessParseInterface {
    type: string;
    data?: any[] | object | string;
}
export interface DataTypeOnlineInterface {
    id: string;
    user: string;
    fullName: string;
    avatar: string;
}

export interface UserOnlineInterface {
    id: string;
    avatar: string;
    fullName: string;
}
export interface TextInterface {
    id?: string;
    idUser: string;
    fullName: string;
    avatar: string;
    text: string;
}
export interface TextDBInterface {
    id: string;
    text: string;
    user: string;
}
export interface TextDBPopulateInterface {
    id: string;
    text: string;
    user: UserOnlineInterface;
}
