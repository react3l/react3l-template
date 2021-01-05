import { Button, Select } from 'antd';
import Modal, { ModalProps } from 'components/Utility/Modal/Modal';
import React, { Reducer } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ImageFile } from '../UploadImage';
import "./CroppedModal.scss";

const defaultCrop = {
    unit: "%", 
    width: 30, 
    aspect: 1 / 1
};

interface ImageResult {
    id?: string | number;
    fileName?: string;
    fileUrl?: string;
    file?: File
}

interface ImageAction {
    type: string;
    data: ImageResult;
};

function imageReducer (currentState: ImageResult[], action: ImageAction): ImageResult[] {
    switch(action.type) {
        case "ADD":
            return [...currentState, action.data];
        case "UPDATE":
            let filterImage = currentState.filter((currentImage) => {
                return currentImage.id === action.data.id;
            });
            let index = currentState.indexOf(filterImage[0]);
            currentState[index] = action.data;
            return [...currentState];
        default:
            return [...currentState];
    }
};

export interface CroppedModalProps extends ModalProps {
    listImage: ImageFile[]
} 

export default function CroppedModal (props: CroppedModalProps) {
    const {
        listImage,
        visible,
        handleCancel,
        handleSave,
    } = props;

    const [selectedImage, setSelectedImage] = React.useState<ImageFile>(null);

    const imgRef = React.useRef(null);

    const [crop, setCrop] = React.useState<any>(defaultCrop);

    const [imageResults, dispatch] = React.useReducer<Reducer<ImageResult[], ImageAction>>(imageReducer, []);
    
    const onImageLoaded = React.useCallback((image: any) => {
        imgRef.current = image;
    }, []);

    const getCroppedImg = React.useCallback(async (image, crop, fileName): Promise<any> => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            var fileUrl;
            window.URL.revokeObjectURL(fileUrl);
            fileUrl = window.URL.createObjectURL(blob);
            const file = new File([blob], fileName);
            resolve({fileUrl, file});
          }, 'image/jpeg');
        });
    }, []);

    const makeCropImage = React.useCallback(async () => {
        if (imgRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImg(
                imgRef.current,
                crop,
                selectedImage.file.name
            );

            const imageExisted = imageResults.filter((current) => current.id === selectedImage.fileId)[0];

            if (imageExisted) {
                dispatch({
                    type: "UPDATE",
                    data: {
                        id: selectedImage.fileId,
                        fileName: selectedImage.file.name,
                        fileUrl: croppedImage.fileUrl as string,
                        file: croppedImage.file as File
                    }
                });
            } else {
                dispatch({
                    type: "ADD",
                    data: {
                        id: selectedImage.fileId,
                        fileName: selectedImage.file.name,
                        fileUrl: croppedImage.fileUrl as string,
                        file: croppedImage.file as File
                    }
                });
            }
            
          }
    }, [getCroppedImg, crop, selectedImage, imageResults]);

    const cropFull = React.useCallback(() => {
        const newImage = new Image();
        newImage.onload = function() {
            setCrop({
                unit: 'px',
                width: newImage.width,
                height: newImage.height,
                x: 0,
                y: 0
            });
            makeCropImage();
        };
        newImage.src = selectedImage.fileUrl as string;
    }, [selectedImage, makeCropImage]);

    const handleSelect = React.useCallback((itemKey: string | number) => {
        setSelectedImage(listImage[itemKey]); 
    }, [listImage]);

    const handleChangeAspect = React.useCallback((value: any) => {
        if (value) {
            setCrop({
                unit: "%", 
                width: 30, 
                aspect: value
            });
        } else {
            setCrop({
                unit: "%",
                width: 30
            });
        }
    }, []);

    const handleSaveModal = React.useCallback(() => {
        handleSave(imageResults);
    }, [handleSave, imageResults]);

    const handleCancelModal = React.useCallback(() => {
        handleCancel();
    }, [handleCancel]);

    React.useEffect(() => {
        if(listImage) {
            setSelectedImage(listImage[0]);
        }
    }, [listImage]);

    return <>
        <Modal visible={visible}
            width={800}
            visibleFooter={true}
            closable={false}
            handleSave={handleSaveModal}        
            handleCancel={handleCancelModal}>
                <div className="cropped-modal__container">
                    <div className="cropped-modal__content">
                        <div className="cropped-modal__upper">
                            <div className="cropped-modal__image">
                                <ReactCrop
                                    src={selectedImage?.fileUrl}
                                    onImageLoaded={onImageLoaded}
                                    crop={crop}
                                    onChange={(c) => setCrop(c)}
                                    onComplete={(c) => setCrop(c)}
                                    style={{width: "100%"}}
                                />
                            </div>
                            <div className="cropped-modal__action">
                                <Button type="primary" ghost onClick={makeCropImage}>
                                    Crop
                                </Button>
                                <Button type="primary" ghost onClick={cropFull} style={{marginTop: "15px"}}>
                                    CropFull
                                </Button>
                                <Select defaultValue={1 / 1} style={{ marginTop: "15px" }} onChange={handleChangeAspect}>
                                    <Select.Option value={16 / 9}>16 : 9</Select.Option>
                                    <Select.Option value={4 / 3}>4 : 3</Select.Option>
                                    <Select.Option value={1 / 1}>1 : 1</Select.Option>
                                    <Select.Option value={null}> Default </Select.Option>
                                </Select>
                            </div>
                        </div>
                            <div className="cropped-modal__list">
                                {   listImage.map((currentImage, index) => {
                                        return <div className="cropped-modal__image" 
                                                    key={index} 
                                                    onClick={() => {handleSelect(index);}}>
                                            <img src={currentImage.fileUrl as string} alt="IMG"></img>
                                        </div>;
                                    })
                                }
                            </div>
                    </div>
                    <div className="cropped-modal_result">
                        {imageResults.map((currentImage, index) => {
                            return <img alt="Crop"
                                key={index} 
                                src={currentImage.fileUrl} 
                                style={{width: crop.width, height: crop.height}}/>;
                        })}
                    </div>
                </div>
        </Modal>
    </>;
}