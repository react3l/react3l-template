import React, { ReactNode } from 'react';
import './FormItem.scss';
import classNames from 'classnames';

export enum ValidateStatus {
  success='success',
  warning='warning',
  error='error',
  validating='validating'
}

interface FormItemProps {
  label?: string;
  validateStatus?: ValidateStatus;
  hasIcon?: boolean;
  message?: string;
  children: ReactNode;
  renderIcon?: ReactNode;
}

function FormItem(props: FormItemProps) {
  const {
    label,
    validateStatus,
    hasIcon,
    message,
    children,
    renderIcon,
  } = props;
  return (
    <>
      <div className={classNames('form-item__container', {[`form-item__container--${validateStatus}`]: validateStatus})}>
        { label && 
          <div className={classNames('component__title')}>{label}</div>
        }
        <div className="form-item__content">
          {children}
          { hasIcon &&  
            <div className="form-item__icon">
                { renderIcon ? renderIcon : (
                  <i className={classNames({
                    'tio-clear_circle_outlined': validateStatus === ValidateStatus.error,
                    'tio-checkmark_circle_outlined': validateStatus === ValidateStatus.success,
                    'tio-warning_outlined': validateStatus === ValidateStatus.warning,
                  })}></i>
                ) }
            </div>
          }
        </div>
        <div className="form-item__message">
          {message}
        </div>
      </div>
    </>
  );
}

FormItem.defaultProps = {
  hasIcon: false,
  renderIcon: null,
};

export default FormItem;
