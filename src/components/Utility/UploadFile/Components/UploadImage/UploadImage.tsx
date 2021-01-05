import { Model, ModelFilter } from "@react3l/react3l/core";
import {
    Batch,
    BatchItem
} from "@rpldy/shared/types";
import UploadDropZone from "@rpldy/upload-drop-zone";
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
    useItemFinishListener,
    useItemStartListener
} from "@rpldy/uploady";
import { ASSETS_SVG } from "config/consts";
import React, { Reducer } from 'react';
import ScrollMenu from "react-horizontal-scrolling-menu";
import { UploadFileProps } from "../../UploadFile";
import CroppedModal from "./CroppedModal/CroppedModal";
import './UploadImage.scss';
import { ArrowLeft, ArrowRight, Menu } from "./UploadImageComponents";

const menu = Menu([
    {imageUrl: "/assets/img/demoImage1.png", isDelete: true},
    {imageUrl: "/assets/img/demoImage2.png", isDelete: true},
    {imageUrl: "/assets/img/demoImage1.png", isDelete: true},
]);

export interface ImageFile {
    fileId: string | number;
    file: File;
    fileUrl: string | ArrayBuffer;
}

interface ImageAction {
    type: string;
    data: ImageFile;
}

const imageReducer = (state: ImageFile[], action: ImageAction): ImageFile[] => {
    switch(action.type) {
        case 'UPDATE':
            return [...state, action.data];
        default:
            return [...state];
    }
};

export interface UploadImageProps extends UploadFileProps<Model, ModelFilter> {

}

export function UploadImage(props: UploadImageProps) {
    const {
        isMultiple,
        getListFile
    } = props;
    const uploady = React.useContext(UploadyContext);

    const [listImage, dispatch] = React.useReducer<Reducer<ImageFile[], ImageAction>>(imageReducer, []);

    const [isPreview, setIsPreview] = React.useState<boolean>();

    const removeImage = React.useCallback((file) => {

    }, []);

    const handleClosePreview = React.useCallback(() => {
        setIsPreview(false);
    }, []);

    const handleSaveCropped = React.useCallback((imageCroppedList: any[]) => {
        if (imageCroppedList && imageCroppedList.length) {
            imageCroppedList.forEach((currentImage) => {
                
            });
        }
    }, []);

    React.useEffect(() => {
        if(typeof getListFile === 'function') {
            getListFile().subscribe((res) => {
            }, (err) => {
            });
        }
    }, []);

    useBatchAddListener ((batch: Batch) => {
        if (batch && batch.items) {
            batch.items.forEach((currentItem) => {
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    dispatch({
                        type: 'UPDATE',
                        data: {
                            fileId: currentItem.id,
                            file: currentItem.file as File,
                            fileUrl: fileReader.result
                        }
                    });
                };
                const file = currentItem.file as File;
                if (file) {
                    fileReader.readAsDataURL(file);
                }
            });
            setIsPreview(true);
        }
    });

    useBatchStartListener((batch: Batch) => {
    });

    useBatchProgressListener((batch: Batch) => {
    });

    useBatchFinishListener((batch: Batch) => {
    });

    useBatchCancelledListener((batch: Batch) => {
    });

    useItemStartListener((item: BatchItem) => {
    });

    useItemFinishListener((item: BatchItem) => {
    });

    useItemErrorListener((item: BatchItem) => {  
    });

    useItemAbortListener((item: BatchItem) => {  
    });

    useItemFinalizeListener((item: BatchItem) => {  
    });

    const onClick = React.useCallback( () => {
        uploady.showFileUpload();
    }, [uploady]);

    return <>
        <div className="upload-image__container">
            <UploadDropZone onDragOverClassName="drag-over">
                <div className="upload-image__drop-zone" onClick={onClick}>
                    <img src={ASSETS_SVG + '/upload.svg'} alt="icon"></img>
                    <p>Drag&Drop File(s) Here</p>
                </div>           
            </UploadDropZone>
            <div className="upload-image__list">
                <ScrollMenu
                    alignCenter={false}
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    />
            </div>
        </div>
        {   listImage && 
            <CroppedModal visible={isPreview}
                handleCancel={handleClosePreview}
                handleSave={handleSaveCropped} 
                listImage={listImage}/> 
        }
    </>;
}

