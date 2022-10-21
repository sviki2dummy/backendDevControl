export interface ILoginRequest {
    username: string,
    password: string,
}

export interface ILoginResponse {
    userId: number,
}

export interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
}

export interface IRegistrationPendingRequests {
    uuid: string,
    username: string,
    email: string,
    password: string,
}

export interface ILogoutRequest {
    username: string,
}