export interface ISocketMessage {
    type: string;
    payload: string;
    timestamp: string;
    sender?: string;
    roomId?: string;
}