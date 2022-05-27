import { IFile } from "@models/File";
import axios from "axios";

interface IUseUploadFile {
    upload: <TResponse = {}>(name: string, file: Blob, fileName?: string) => Promise<TResponse>;
}

interface IUseUploadFileProps {
    dest: string;
}

export const useUploadFile = ({
    dest
}: IUseUploadFileProps): IUseUploadFile => {
    const _upload = async <TResponse = {}>(name: string, file: Blob, fileName?: string): Promise<TResponse> => {
        let formData = new FormData();
        formData.append(name, file, fileName);

        let response = await axios.post<TResponse>(dest, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data;
    }

    return {
        upload: _upload
    }
}