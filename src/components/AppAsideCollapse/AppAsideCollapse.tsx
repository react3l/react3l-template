import React from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router";
import { RouteConfig } from "react-router-config";
import { menu } from "config/menu";
import './AppAsideCollapse.scss';
import classNames from 'classnames';


interface ISidebarProps extends RouteComponentProps {
  style?: any;
  routes?: RouteConfig[];
  className?: string;
}
function AppAsideCollapse(props: ISidebarProps) {
  const { style, routes, className } = props;
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  console.log('routes', routes)
  return (
    <div className="aside-collapse">
      <div className={classNames('aside__header pb-4', className)}>
        <div className="aside__navbar-brand d-flex">
          <div className="app-aside__logo">
            <img src="/assets/img/logo.png" alt="" width="38" />
          </div>
        </div>
      </div>
      <section className="aside-collapse_menu">
        {
          routes && routes?.length > 0 && routes.map((route: RouteConfig, index: number) => {
            console.log(route)
            return (
              route.notTitle === false && (
                <div className="aside-collapse_icon">
                  <i className={route.icon} />
                </div>
              )
            )
          })
        }
      </section>

    </div>
  );
}

AppAsideCollapse.defaultProps = {
  routes: menu,
};

export default withRouter(AppAsideCollapse);