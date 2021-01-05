import { ASSETS_SVG } from 'config/consts';
import React from 'react';

interface ImageItemProps {
    imageUrl: string | ArrayBuffer
    isDelete: boolean
}

const Arrow = (className, classIconName) => {
    return (
        <div className={`arrow__container arrow__${className}`}>
            <i className={`arrow ${classIconName}`}></i>
        </div>
    );
};

const ImageItem = (props: ImageItemProps) => {
    return <div className="image-item__container" 
        style={{backgroundImage: `url(${props.imageUrl})`}}
        onClick={(event) => {event.stopPropagation(); event.preventDefault();}}>
            {
                props.isDelete && 
                <div className="image-item__action-block">
                    <button className="image-item__btn-delete">
                        <img src={ASSETS_SVG + '/trash.svg'} alt=""></img>
                    </button>
                </div>
            }
    </div>;
};

export const ArrowLeft = Arrow("previous", "tio-back_ui");

export const ArrowRight = Arrow("next", "tio-next_ui");

export const Menu = (list: ImageItemProps[]) => list.map((el: ImageItemProps, index) => {
    return <ImageItem key={index} imageUrl={el.imageUrl} isDelete={el.isDelete}/>;
});