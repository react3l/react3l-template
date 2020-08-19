import AppAside from 'components/AppAside/AppAside';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import AppMain from 'components/AppMain/AppMain';
import { menu } from 'config/menu';
import React from 'react';
import 'views/App/App.scss';

function App() {
  return (
    <div className="app d-flex">
      <AppAside routes={menu} />
      <section className="flex-item">
        <AppHeader />
        <main className="body">
          <AppMain />
        </main>
      </section>
      <AppFooter />
    </div>
  );
}

export default App;
