import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import { AppAction, AppActionEnum, AppState, AppStoreContext } from "App";
import classNames from "classnames";
import { menu } from "config/menu";
import React, { Dispatch, useCallback, useContext, useState } from "react";
import { useLocation } from "react-router";
import { RouteConfig } from "react-router-config";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AppAside.scss";
import AsideMenu from "./AsideMenu/AsideMenu";

const { Sider } = Layout;

interface IDefaultSidebarProps extends RouteComponentProps {
  style?: any;
  routes?: RouteConfig[];
  className?: string;
}

function AppAside(props: IDefaultSidebarProps) {
  const { style, routes, className } = props;
  const { pathname } = useLocation();
  const testOpenKeys = React.useMemo(() => {
    return  getOpenKeys(routes, pathname);
  }, [routes, pathname]);
  const testSelectedKeys = React.useMemo(() => {
    return [convertPathName(pathname)];
  }, [pathname]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [state, dispatch] = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext,
  );
  
  const handleCollapse = useCallback(() => {
    setCollapsed(!collapsed);
    dispatch({
      type: AppActionEnum.EXTEND_PAGE,
      extendPageMaster: !state.extendPageMaster,
    });
  }, [collapsed, state, dispatch]);

  return (
    <>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          theme="light"
          onBreakpoint={broken => {
            if(broken) {
              setCollapsed(true);
            } else {
              setCollapsed(false);
            }
          }}
          width={250}
          collapsedWidth={65}
          className={classNames("app-aside__container", className)}
          style={style}
        >
          <div className="app-aside__header d-flex justify-content-between">
            <div className='d-flex'>
              <div className='app-aside__logo'>
                <img src='/assets/img/logo.png' alt='IMG' onClick={() => collapsed ? handleCollapse() : null }/>
              </div>
              <div className='app-aside__name ml-3'>ePayment</div>
            </div>
            <div className='app-aside__toggle' onClick={handleCollapse}>
              <i className='tio-menu_hamburger' />
            </div>
          </div>
          <Menu
            mode='inline'
            className='aside__default-sidebar'
            inlineIndent={0}
            defaultSelectedKeys={testSelectedKeys}
            defaultOpenKeys={testOpenKeys}
            theme='light'
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
    </>
  );
}

/* pathName param from url */
function getOpenKeys(items: RouteConfig[], pathName) {
  const selectedKeys = [];
  items.forEach((item) => {
    const paths = item.path
      .toString()
      .trim()
      .split("/");
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
  pathName = buildPath(pathName.trim().split("/"));
  if (pathName.includes(`detail`)) {
    const tmp = pathName.split("detail");
    const path = tmp[0] + "master";
    return path;
  }
  
  if (pathName.includes(`preview`)) {
    const tmp = pathName.split("preview");
    const path = tmp[0] + "master";
    return path;
  }
  return pathName;
}

/* builPath from item path, contain maximum 4 element. Eg: /dms/product-category/product/product-master */
function buildPath(paths: string[]) {
  let result = "";
  if (paths.length < 5) {
    for (let i = 1; i < paths.length; i++) {
      result = result + "/" + paths[i];
    }
    return result;
  }
  return `${paths[0]}/${paths[1]}/${paths[2]}/${paths[3]}/${paths[4]}`;
}

AppAside.defaultProps = {
  routes: menu,
};

export default withRouter(AppAside);
