import { Model, ModelFilter } from "@react3l/react3l/core";
import React from "react";
import { Observable } from "rxjs";
import { UploadButton } from "./Components/UploadButton/UploadButton";
import { UploadImage } from "./Components/UploadImage/UploadImage";
import { UploadZone } from "./Components/UploadZone/UploadZone";

export enum UPLOADTYPE {
  BUTTON,
  ZONE,
  IMAGE,
}

export interface UploadFileProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  type?: UPLOADTYPE;
  isMultiple?: boolean;
  autoUpload?: boolean;
  fileFilter?: (file: unknown, index: number, files: unknown[]) => boolean;
  getListFile?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  uploadFile?: (files: File[]) => Observable<File[]>;
  removeFile?: (TModelFilter?: TModelFilter) => Observable<boolean>;
}

function UploadFile(props: UploadFileProps<Model, ModelFilter>) {
  const { isMultiple, fileFilter, autoUpload } = props;

  const renderUpload = React.useMemo(() => {
    switch (props.type) {
      case UPLOADTYPE.BUTTON:
        return <UploadButton {...props} />;
      case UPLOADTYPE.ZONE:
        return <UploadZone {...props} />;
      case UPLOADTYPE.IMAGE:
        return <UploadImage {...props} />;
      default:
        return <></>;
    }
  }, [props]);

  return <></>;
}

UploadFile.defaultProps = {
  type: UPLOADTYPE.IMAGE,
  isMultiple: true,
  autoUpload: false,
};

export default UploadFile;
