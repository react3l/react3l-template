import React from 'react';
import './AppHeader.scss';

function AppHeader() {
  return (
    <header className="app-header">
      <button className="btn btn-sm component__btn-primary ml-3">
        <i className="tio-add d-flex justify-content-center" />
      </button>
      <div className="float-right mt-3">
        <div className="d-flex align-items-center">
          <div className="app-header__language">
            Tiếng Việt
          </div>
          <div className="app-header__notifications">
            <i className="tio-notifications_outlined" />
          </div>
          <div className="app-header__user">
            <div className="app-header__display-name">
              Vu Dang
            </div>
            <div className="app-header__username">
              Administrator
            </div>

          </div>
        </div>
      </div>

    </header>
  );
}

export default AppHeader;
