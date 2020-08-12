import classNames from 'classnames';
import React, {ButtonHTMLAttributes, PropsWithChildren, RefObject} from 'react';
import './Button.scss';

export type ButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'link';

export interface ButtonProps {
  type?: ButtonType;

  htmlType?: ButtonHTMLAttributes<any>['type'];

  outlined?: boolean;

  className?: string;

  onClick?: ButtonHTMLAttributes<any>['onClick'];
}

const Button = React.forwardRef(
  function ButtonComponent(props: PropsWithChildren<ButtonProps>, ref: RefObject<HTMLButtonElement>) {
    const {htmlType, children, type, onClick, className} = props;

    return (
      <button type={htmlType} onClick={onClick} ref={ref} className={classNames('btn', `btn-${type}`, className)}>
        {children}
      </button>
    );
  },
);

Button.defaultProps = {
  type: 'default',
  outlined: false,
  htmlType: 'button',
};

export default Button;
