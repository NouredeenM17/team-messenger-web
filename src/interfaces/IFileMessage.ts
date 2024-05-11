import { IFile } from "./IFile";
import { IMessage } from "./IMessage";

export interface IFileMessage extends IMessage {
    file: IFile;
}