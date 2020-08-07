import classNames from 'classnames';
import AsideMenu from 'components/AppAside/AsideMenu/AsideMenu';
import React from 'react';
import {RouteConfig} from 'react-router-config';
import './AppAside.scss';

export interface AppAsideProps {
  menu: RouteConfig[];

  className?: string;
}

function AppAside(props: AppAsideProps) {
  const {className, menu} = props;

  return (
    <aside className={classNames('app-aside', className)}>
      <div>
        <AsideMenu menu={menu}/>
      </div>
    </aside>
  );
}

export default AppAside;
