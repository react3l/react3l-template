import React from 'react';
import "./UploadZone.scss";

export interface UploadZoneProps {
    isMultiple: boolean;
};

export function UploadZone(props: UploadZoneProps) {
    
    return <div className="upload-zone__container">
        <div className="upload-zone__wrapper">
            <div className="upload-zone__drag">
                    
            </div>
            <div className="upload-zone__list">

            </div>
        </div>
    </div>;
};

UploadZone.defaultProps = {
    isMultiple: true,
};