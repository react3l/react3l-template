import React from 'react';
import './AppHeader.scss';
import Avatar, { ConfigProvider } from 'react-avatar';

function AppHeader() {
  return (
    <div className="header__navbar-default">
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
            <div className="app-header__avatar ml-3 mr-3">
              {/* <img className="mr-1 app-header__avatar-img" src="public/assets/img/avatar.jpg" alt="" /> */}
              <ConfigProvider colors={['red', 'green', 'blue']}>
                <Avatar maxInitials={1} round={true} size="34" name="Dang Tuan Vu" />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </header>
    </div>

  );
}

export default AppHeader;
