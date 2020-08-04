import React from 'react';
import 'views/App/App.scss';
import {renderRoutes} from 'react-router-config';
import {Switch} from 'react-router';
import {routes} from 'config/routes';

function App() {
  return (
    <div className="app">
      <header className="header">

      </header>
      <section className="body">
        <aside>

        </aside>
        <main>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </main>
      </section>
    </div>
  );
}

export default App;
