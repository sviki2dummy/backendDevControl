interface ILoginRequest {
    username: string,
    password: string,
}

interface ILoginResponse {
    userId: number,
}

interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
}

interface IRegistrationPendingRequests {
    uuid: string,
    username: string,
    email: string,
    password: string,
}

interface ILogoutRequest {
    username: string,
}