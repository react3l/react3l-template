import {
    UploadyContext,
    useBatchAddListener,
    useBatchCancelledListener,
    useBatchFinishListener,
    useBatchProgressListener,
    useBatchStartListener,
    useItemAbortListener,
    useItemErrorListener,
    useItemFinalizeListener,
    useItemStartListener
} from '@rpldy/uploady';
import React from 'react';
import "./UploadButton.scss";

export interface UploadButtonButtonProps {
    isMultiple: boolean;
};

export function UploadButton(props: UploadButtonButtonProps) {
    const {
        isMultiple
    } = props;
    const uploady = React.useContext(UploadyContext);
    const [fileInfo, setFileInfo] = React.useState(null);

    useBatchAddListener ((batch) => {
        if (batch) {
            if (isMultiple) {
                batch.items.forEach((currentBatch, index) => {

                });
            } else {
                setFileInfo(batch.items[0].file);
            }
        }
        setFileInfo(batch.items[0].file);
    });

    useBatchStartListener((batch) => {
        if (batch) {
            
        }
    });

    useBatchProgressListener((batch) => {
    });

    useBatchFinishListener((batch) => {
    });

    useBatchCancelledListener((batch) => {
    });

    useItemStartListener((item) => {
    });

    useItemErrorListener((item) => {  
    });

    useItemAbortListener((item) => {  
    });

    useItemFinalizeListener((item) => {  
    });

    const onClick = React.useCallback( () => {
            uploady.showFileUpload();
    }, [uploady]);

    return <div className="upload-button__container">
            <button onClick={onClick}>Custom Upload Button</button>
            <div>{fileInfo?.name}</div>
    </div>;
};

UploadButton.defaultProps = {
    isMultiple: true,
};