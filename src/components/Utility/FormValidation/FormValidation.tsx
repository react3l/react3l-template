import React, { ReactNode } from 'react';
import './FormValidation.scss';
import classNames from 'classnames';

export enum ValidateStatus {
  success='success',
  warning='warning',
  error='error',
  validating='validating'
}

interface FormValidationProps {
  validateStatus?: ValidateStatus;
  hasIcon?: boolean;
  message?: string;
  children: ReactNode;
  renderIcon?: ReactNode;
}

function FormValidation(props: FormValidationProps) {
  const {
    validateStatus,
    hasIcon,
    message,
    children,
    renderIcon,
  } = props;
  return (
    <>
      <div className={classNames('form-validation__container', {[`form-validation__container--${validateStatus}`]: validateStatus})}>
        <div className="form-validation__content">
          {children}
          { hasIcon &&  
            <div className="form-validation__icon">
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
        <div className="form-validation__message">
          {message}
        </div>
      </div>
    </>
  );
}

FormValidation.defaultProps = {
  hasIcon: false,
  renderIcon: null,
};

export default FormValidation;
