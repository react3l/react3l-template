import { Model, ModelFilter } from "@react3l/react3l/core";
import Uploady from "@rpldy/uploady";
import React from 'react';
import { Observable } from "rxjs";
import { UploadButton } from "./Components/UploadButton/UploadButton";
import { UploadImage } from "./Components/UploadImage/UploadImage";
import { UploadZone } from "./Components/UploadZone/UploadZone";
export interface FileModel {
    id?: number,
    name?: string,
    content?: string,
    mimeType?: string,
    isFile?: boolean,
    key?: number,
    path?: string,
    level?: number,
    rowId?: string,
    isDelete: boolean
    clearAction?: (fileId: string | number) => void
}

export enum UPLOADTYPE {
  BUTTON,
  ZONE,
  IMAGE,
}

export interface UploadFileProps <T extends Model, TModelFilter extends ModelFilter> {
    type?: UPLOADTYPE;
    autoUpload?: boolean;
    files?: FileModel[];
    fileFilter?: (file: unknown, index: number, files: unknown[]) => boolean;
    updateList?: (files: File[] | FileList) => void;
    getListFile?: (TModelFilter?: TModelFilter) => Observable<T[]>;
    uploadFile?: (files: File[]) => Observable<File[]>;
    removeFile?: (TModelFilter?: TModelFilter) => Observable<boolean>;
}

function UploadFile (props: UploadFileProps<Model, ModelFilter>) {
    const renderUpload = React.useMemo(() => {
        switch(props.type) {
            case UPLOADTYPE.BUTTON:
                return <UploadButton {...props} />;
            case UPLOADTYPE.ZONE:
                return <UploadZone {...props}/>;
            case UPLOADTYPE.IMAGE:
                return <UploadImage {...props}/>;
            default:
                return <></>;
        }
    }, [props]);
 
    return <>
        <div className="upload-file__container">
            <Uploady>
                {renderUpload}
            </Uploady>
        </div>
    </>;
}

UploadFile.defaultProps = {
  type: UPLOADTYPE.IMAGE,
  isMultiple: true,
  autoUpload: false,
};

export default UploadFile;
