import AppAside from 'components/AppAside/AppAside';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import { menu } from 'config/menu';
import { routes } from 'config/routes';
import React from 'react';
import { Switch, withRouter, useLocation } from 'react-router';
import { renderRoutes } from 'react-router-config';
import './App.scss';
import { useGlobal, setGlobal } from 'reactn';
import { GlobalState } from 'config/global-state';
import classNames from 'classnames';
import AppAsideCollapse from 'components/AppAsideCollapse/AppAsideCollapse';
import {Animated} from "react-animated-css";

function App() {

  const [display] = useGlobal<GlobalState>('display');
  const [toggleMenu] = useGlobal<GlobalState>('toggle');
  const [displayFooter, setDisplayFooter] = React.useState<boolean>(false);

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname.includes('detail')) {
      setDisplayFooter(true);
    }
    if (pathname.includes('master')) {
      setDisplayFooter(false);
    }
  }, [pathname]);

  return (
    <>
      <div className="app d-flex">
        {
          !toggleMenu ? 
          <Animated animationIn="slideInLeft" 
            animationOut="slideOutLeft" 
            animationInDuration={800} 
            animationOutDuration={400} 
            isVisible={!toggleMenu as boolean}>
            <div className="left-side column">
              <AppAside routes={menu} />
            </div>
          </Animated> :
          <Animated animationIn="slideInLeft" 
            animationOut="slideOutLeft" 
            animationInDuration={800} 
            animationOutDuration={400} 
            isVisible={toggleMenu as boolean}>
            <div className="left-side column">
              <AppAsideCollapse routes={menu} />
            </div>
          </Animated>
        }
        <div className="right-side column">
          <div className={classNames("header-wrapper", { "header-wrapper__block": display },
            )}>
              <AppHeader />
          </div>
          <main className="body">
            <Switch>{renderRoutes(routes)}</Switch>
          </main>
          <div
            className={classNames(
              { "header__overlay header__display-block": display },
            )}>
          </div>
        </div>
        {
          displayFooter === true ? <AppFooter /> : null
        }
      </div>
    </>

  );
}

export default withRouter(App);
