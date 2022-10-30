interface IConnection {
    username: string,
    connectionId: number,
    timestampBegin: string,
    frontEndType: 'web' | 'responsive-web' | 'mobileApp' | 'wearOS',
}

interface IConnectRequest {
    username: string,
    password: string,
    connectionId?: number,
    frontEndType: 'web' | 'responsive-web' | 'mobileApp' | 'wearOS',
}

interface IConnectResponse {
    connectionId: number,
}

interface IDisconnectRequest {
    username: string,
    password: string,
    connectionId: number,
}