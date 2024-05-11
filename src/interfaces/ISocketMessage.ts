import { IFile } from "./IFile";

export interface ISocketMessage {
    type: string;
    payload: string;
    timestamp?: string;
    sender: string;
    roomId: string;
    file?: IFile;
    userList?: string[];
}