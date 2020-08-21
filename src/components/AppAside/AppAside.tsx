import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import classNames from 'classnames';
import { menu } from 'config/menu';
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './AppAside.scss';
import AsideMenu from './AsideMenu/AsideMenu';


const { Sider } = Layout;

interface IDefaultSidebarProps extends RouteComponentProps {
  style?: any;
  routes?: RouteConfig[];
  className?: string;
}

function AppAside(props: IDefaultSidebarProps) {
  const { style, routes, className } = props;
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const keys = getOpenKeys(routes, pathname);
    setOpenKeys(keys);
    setSelectedKeys([convertPathName(pathname)]);
  }, [pathname, routes]);

  const handleChange = useCallback(
    (keys: string[]) => {
      setOpenKeys([...keys]);
    },
    [setOpenKeys],
  );

  const handleSelect = useCallback(({ selectedKeys }) => {
    setSelectedKeys([...selectedKeys])
  }, [setSelectedKeys])


  console.log('routes: ', routes)
  return (
    <div className="aside">
      <div className={classNames('aside__header pb-4', className)}>
        <div className="aside__navbar-brand d-flex">
          <div className="app-aside__logo">
            <img src="/assets/img/logo.png" alt="" width="38" />
          </div>
          <div className="aside__name ml-3">ePayment</div>
        </div>
      </div>
      <Sider
        collapsible={false}
        className={classNames('pb-4', className)}
        style={style}
      >
        <Menu
          mode="inline"
          className="aside__default-sidebar"
          inlineIndent={0}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleChange}
          onSelect={handleSelect}
          theme="light"
        >
          {routes.length > 0 &&
            routes.map((route: RouteConfig) => (
              <AsideMenu
                {...props}
                key={route.key ? route.key : uuidv4()}
                item={route}
              />
            ))}
        </Menu>
      </Sider>
    </div>
  );
}

/* pathName param from url */
function getOpenKeys(items: RouteConfig[], pathName) {
  const selectedKeys = [];
  items.forEach(item => {
    const paths = item.path
      .toString()
      .trim()
      .split('/');
    const modulePath = buildPath(paths);
    if (
      item.path === pathName ||
      item.key === pathName ||
      pathName.toString().indexOf(modulePath) !== -1
    ) {
      selectedKeys.push(item.key ? item.key : item.path);
    }
    if (item.children) {
      const itemKeys = getOpenKeys(item.children, pathName);
      selectedKeys.push(...itemKeys);
    }
  });
  return selectedKeys;
}

/* convert pathName which retrieved from url to master url of its module, to activating menu master item */
function convertPathName(pathName: string) {
  pathName = buildPath(pathName.trim().split('/'));
  if (pathName.match(/(-?detail)$/)) {
    return pathName.replace('detail', 'master');
  }
  if (pathName.match(/(-?preview)$/)) {
    return pathName.replace('preview', 'master');
  }
  return pathName;
}

/* builPath from item path, contain maximum 4 element. Eg: /dms/product-category/product/product-master */
function buildPath(paths: string[]) {
  let result = '';
  if (paths.length < 5) {
    for (let i = 1; i < paths.length; i++) {
      result = result + '/' + paths[i];
    }
    return result;
  }
  return `${paths[0]}/${paths[1]}/${paths[2]}/${paths[3]}/${paths[4]}`;
}


AppAside.defaultProps = {
  routes: menu,
};

export default withRouter(AppAside);
