export interface IMessage {
    type: string;
    content: string;
    sender: string;
    timestamp?: string;
}