export enum VideoPropertySourceType {
    Local = "Local",
    Url = "Url",
}

export interface IVideoPropertyData {
    sourceType: VideoPropertySourceType;
    allowTypes?: string[];
    data: any;
}