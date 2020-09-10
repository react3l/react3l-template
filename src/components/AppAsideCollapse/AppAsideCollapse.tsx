import React from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router";
import { RouteConfig } from "react-router-config";
import { menu } from "config/menu";
import './AppAsideCollapse.scss';
import classNames from 'classnames';
import { NavLink } from "react-router-dom";


interface ISidebarProps extends RouteComponentProps {
  style?: any;
  routes?: RouteConfig[];
  className?: string;
}
function AppAsideCollapse(props: ISidebarProps) {
  const { routes, className } = props;
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectedKeys([convertPathName(pathname)]);
  }, [pathname, routes]);


  return (
    <div className="aside-collapse">
      <div className={classNames('aside__header pb-4', className)}>
        <div className="aside__navbar-brand d-flex">
          <div className="app-aside__logo">
            <img src="/assets/img/logo.png" alt="" width="38" />
          </div>
        </div>
      </div>
      <section className="aside-collapse__menu">
        {
          routes && routes?.length > 0 && routes.map((route: RouteConfig, index: number) => {
            const active = activeLink(selectedKeys, route?.path);
            return (
              <div key={index}>
                {
                  (route.notTitle === false || !route.notTitle) && (
                    <div className="dropdown dropright" >
                      <li className={classNames('aside-collapse__icon', (active ? 'aside-collapse__icon-active' : ''))}>
                        <NavLink to={`${route?.path}`} activeClassName="aside-collapse__icon-active">
                          <i className={route.icon} />
                        </NavLink>
                      </li>
                      <ul className="aside-collapse__child">
                        {
                          route?.children && route?.children?.length > 0 && route?.children.map((child: RouteConfig, indexChild: number) => (
                            <li className="aside-collapse__child-item" key={indexChild}>
                              <NavLink to={`${child?.path}`} activeClassName="aside-collapse__icon-active">
                                {child?.name}
                              </NavLink>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }
              </div>
            );
          })
        }
      </section>
    </div>
  );
}

function activeLink(selectedKeys, path) {
  if (selectedKeys.includes(`${path}`)) {
    return true;
  }
  return false;
}



/* pathName param from url */
// function getOpenKeys(items: RouteConfig[], pathName) {
//   const selectedKeys = [];
//   items.forEach(item => {
//     const paths = item.path
//       .toString()
//       .trim()
//       .split('/');
//     const modulePath = buildPath(paths);
//     if (
//       item.path === pathName ||
//       item.key === pathName ||
//       pathName.toString().indexOf(modulePath) !== -1
//     ) {
//       selectedKeys.push(item.key ? item.key : item.path);
//     }
//     if (item.children) {
//       const itemKeys = getOpenKeys(item.children, pathName);
//       selectedKeys.push(...itemKeys);
//     }
//   });
//   return selectedKeys;
// }

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



AppAsideCollapse.defaultProps = {
  routes: menu,
};

export default withRouter(AppAsideCollapse);