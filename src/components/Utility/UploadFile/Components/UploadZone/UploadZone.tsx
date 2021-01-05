import {
    UploadyContext,
    useBatchAddListener,
    useBatchCancelledListener,
    useBatchFinishListener,
    useBatchProgressListener,
    useBatchStartListener
} from '@rpldy/uploady';
import React from 'react';
import "./UploadZone.scss";

export interface UploadZoneProps {
    isMultiple: boolean;
};

export function UploadZone(props: UploadZoneProps) {
    
    const uploady = React.useContext(UploadyContext);

    useBatchAddListener ((batch) => {
        
    });

    useBatchStartListener((batch) => {
          
    });

    useBatchProgressListener((batch) => {
          
    });

    useBatchFinishListener((batch) => {
          
    });

    useBatchCancelledListener((batch) => {
          
    });

    useBatchStartListener((batch) => {

    });
    
    return <div className="upload-zone__container">
        
    </div>;
};

UploadZone.defaultProps = {
    isMultiple: true,
};