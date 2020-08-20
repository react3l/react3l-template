import AppAside from 'components/AppAside/AppAside';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import { menu } from 'config/menu';
import { routes } from 'config/routes';
import React from 'react';
import { Switch, withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import './App.scss'
import { useGlobal, setGlobal } from 'reactn';
import { GlobalState } from 'config/global-state';
import classNames from 'classnames';

function App() {

  const [display] = useGlobal<GlobalState>('display');
  console.log('display', display)
  const handleOffOverlay = React.useCallback(() => {
    console.log('display: ', display)
    setGlobal<GlobalState>({ display: false });
    console.log('có vào đây ko nhể 2')
  }, [display]);

  return (
    <div className="app d-flex">
      <AppAside routes={menu} />
      <div
        className={classNames(
          { "header__overlay header__display-block": display },
        )}
        onClick={handleOffOverlay}
      >

      </div>
      <section className="flex-item">
        <AppHeader />
        <main className="body">
          <Switch>{renderRoutes(routes)}</Switch>
        </main>
      </section>
      <AppFooter />
    </div>
  );
}

export default withRouter(App);
