import { ASSETS_SVG } from 'config/consts';
import React from 'react';
import { FileModel } from '../../UploadFile';

interface ImageItemProps extends FileModel {

}

const Arrow = (className, classIconName) => {
    return (
        <div className={`arrow__container arrow__${className}`}>
            <i className={`arrow ${classIconName}`}></i>
        </div>
    );
};

const ImageItem = (props: ImageItemProps) => {
    const {
        id,
        clearAction
    } = props;

    const handleDelete = React.useCallback(() => {
        clearAction(id);
    }, [clearAction, id]);

    return <div className="image-item__container" 
        style={{backgroundImage: `url(${props.path})`}}
        onClick={(event) => {event.stopPropagation(); event.preventDefault();}}>
            {
                props.isDelete && 
                <div className="image-item__action-block">
                    <button className="image-item__btn-delete" onClick={handleDelete}>
                        <img src={ASSETS_SVG + '/trash.svg'} alt=""></img>
                    </button>
                </div>
            }
    </div>;
};

export const ArrowLeft = Arrow("previous", "tio-back_ui");

export const ArrowRight = Arrow("next", "tio-next_ui");

export const Menu = (list: ImageItemProps[]) => list.map((el: ImageItemProps, index) => {
    return <ImageItem key={index} {...el}/>;
});