import classNames from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {RouteConfig} from 'react-router-config';
import './AsideMenu.scss';

export interface AsideMenuProps {
  menu: RouteConfig[];
}

function AsideMenu(props: AsideMenuProps) {
  const [translate] = useTranslation();

  const {menu} = props;

  return (
    <ul className={classNames('aside-menu')}>
      {menu.map((item: RouteConfig) => (
        <React.Fragment key={item.path as string}>
          <li className={classNames('aside-menu-item', 'aside-menu-item-title')}>
            {translate(item.name)}
          </li>
          {item?.routes instanceof Array && (
            <AsideMenu menu={item.routes}/>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default AsideMenu;
