import { IUser } from "../basicModels";

export interface ILoginRequest {
    username: string,
    password: string,
}

export interface ILoginByTokenRequest {
    authToken: string,
}

export interface ILoginResponse {
    authToken: string,
    user: IUser,
}

export interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
}

export interface ILogoutRequest {
    authToken: string,
}

export interface IDeleteUserRequest {
    authToken: string,
}