import AppAside from 'components/AppAside/AppAside';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import { menu } from 'config/menu';
import { routes } from 'config/routes';
import React from 'react';
import { Switch, withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import './App.scss'

function App() {
  return (
    <div className="app d-flex">
      <AppAside routes={menu} />
      <section className="flex-item">
        <AppHeader />
        <main className="body">
          <Switch>{renderRoutes(routes)}</Switch>
        </main>
      </section>
      <section className="header__overlay"></section>
      <AppFooter />
    </div>
  );
}

export default withRouter(App);
