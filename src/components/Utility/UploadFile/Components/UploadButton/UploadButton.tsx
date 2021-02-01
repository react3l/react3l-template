import { Model, ModelFilter } from '@react3l/react3l/core';
import React, { RefObject } from 'react';
import { UploadFileProps } from '../../UploadFile';
import "./UploadButton.scss";

export interface UploadButtonButtonProps extends UploadFileProps <Model, ModelFilter> {
    isMultiple: boolean;
    uploadContent: string;
};

export function UploadButton(props: UploadButtonButtonProps) {
    const {
        isMultiple,
        uploadContent,
        files,
        updateList
    } = props;

    const fileRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>();

    const handleClickButton = React.useCallback(() => {
        fileRef.current.click();
    }, []);

    const handleChangeFile = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            updateList(files);
        }
    }, [updateList]);

    return <div className="upload-button__container">
            <button onClick={handleClickButton} className="upload-button__button">{uploadContent}</button>
            <input type="file" style={{display: 'none'}} multiple={isMultiple} ref={fileRef} onChange={handleChangeFile}/>
            <div className="upload-button__list-file">
                {
                    files && files.length > 0 &&
                    files.map((file) => <>
                        <div className="file-container">
                            {file.name}
                            <i className="file-container__icon tio-clear"></i>
                        </div>
                    </>)
                }
            </div>
    </div>;
};

UploadButton.defaultProps = {
    isMultiple: true,
    uploadContent: 'Upload',
    files: []
};