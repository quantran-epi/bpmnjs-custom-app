import { IFile } from './../File';

export interface IVideoFile extends IFile {

}

export enum VideoPropertySourceType {
    Local = "Local",
    Url = "Url",
}

export interface IVideoPropertyData {
    sourceType: VideoPropertySourceType;
    allowTypes?: string[];
    data: IVideoFile;
}