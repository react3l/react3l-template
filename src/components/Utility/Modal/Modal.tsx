import AntModal, { ModalProps as AntModalProps } from "antd/lib/modal";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "./Modal.scss";

export interface ModalProps extends AntModalProps {
  handleCancel?: () => void;

  handleSave?: () => void;

  children?: ReactNode;

  visibleFooter?: boolean;
}

function Modal(props: ModalProps) {
  const [translate] = useTranslation();
  const { handleCancel, handleSave, visibleFooter } = props;

  const renderModalFooter = React.useMemo(
    () => (
      <div className='d-flex justify-content-end'>
        <button
          className='btn btn-sm component__btn-primary mr-2'
          onClick={handleSave}
        >
          <span>
            <i className='tio-save' /> {translate("general.actions.save")}
          </span>
        </button>
        <button
          className='btn btn-sm component__btn-cancel'
          onClick={handleCancel}
        >
          <i className='tio-clear' /> {translate("general.actions.cancel")}
        </button>
      </div>
    ),
    [handleSave, handleCancel],
  );

  return (
    <>
      <AntModal
        {...props}
        style={{ top: 20 }}
        closable={false}
        destroyOnClose={true}
        wrapClassName={"modal__container"}
        footer={visibleFooter ? renderModalFooter : null}
        onCancel={handleCancel}
      >
        <div className='modal_content'>{props.children}</div>
      </AntModal>
    </>
  );
}

Modal.propsDefalt = {
  visibleFooter: true,
};

export default Modal;
