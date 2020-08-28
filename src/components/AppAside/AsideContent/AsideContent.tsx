import React from 'react';
import './AsideContent.scss';
import { IDefaultSidebarProps } from '../AsideMenu/AsideMenu';
import { useTranslation } from 'react-i18next';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

function AsideContent(props: IDefaultSidebarProps) {
  const { staticContext, item, ...rest } = props;
  const [translate] = useTranslation();
  return (
    <>
      {/* {item.isShow && ( */}
      <Menu.Item key={item.path as string} {...rest}>
        <Link to={item.path as string}>
          {item.icon && <i className={item.icon} />}
          <span className="ml-2">{translate(item.name)}</span>
        </Link>
      </Menu.Item>
      {/* )} */}
    </>
  );
}

export default withRouter(AsideContent);
