import { Menu } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { IDefaultSidebarProps } from '../AsideMenu/AsideMenu';
import './AsideContent.scss';

function AsideContent(props: IDefaultSidebarProps) {
  const { staticContext, item, ...rest } = props;
  const [translate] = useTranslation();

  return (
    <>
      {/* {item.isShow && ( */}
      <Menu.Item key={item.path as string} {...rest}>
        <Link to={item.path as string}>
          {item.icon && <i className={classNames("icon-fontsize", item.icon)} />}
          <span className="ml-2">{translate(item.name)}</span>
        </Link>
      </Menu.Item>
      {/* )} */}
    </>
  );
}

export default withRouter(AsideContent);
