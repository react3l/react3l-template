import AppAside from 'components/AppAside/AppAside';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import AppMain from 'components/AppMain/AppMain';
import {menu} from 'config/menu';
import {routes} from 'config/routes';
import React from 'react';
import 'views/App/App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <section className="body">
        <AppAside menu={menu}/>
        <AppMain routes={routes}/>
      </section>
      <AppFooter/>
    </div>
  );
}

export default App;
