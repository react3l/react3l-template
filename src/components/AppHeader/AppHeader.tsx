import React from "react";
import "./AppHeader.scss";
import Avatar, { ConfigProvider } from "react-avatar";
import classNames from 'classnames';
function AppHeader() {
  const [display, setDisplay] = React.useState<boolean>(false);

  const handleClick = React.useCallback(() => {
    setDisplay(true);
  }, []);

  const handleOffOverlay = React.useCallback(() => {
    setDisplay(false);
  }, []);

  const menus = [
    {
      icon: "tio-credit_card_add",
      title: "Đề nghị thanh toán cá nhân",
      route: "/",
    },
    {
      icon: "tio-credit_card_add",
      title: "Đề nghị thanh toán NCC",
      route: "/",
    },
    {
      icon: "tio-savings",
      title: "Đề nghị tạm ứng",
      route: "/",
    },
    {
      icon: "tio-credit_card_remove",
      title: "Đề nghị thanh toán trả trước",
      route: "/",
    },
    {
      icon: "tio-medal",
      title: "Tạo mới NCC",
      route: "/",
    },
    {
      icon: "tio-money_vs",
      title: "Tạo mới Ngân sách",
      route: "/",
    },
  ];

  return (
    <>
      <div className="header__navbar-default">
        <header className="app-header">
          <button
            className="btn btn-sm component__btn-primary ml-3"
            onClick={handleClick}
          >
            <i className="tio-add d-flex justify-content-center" />
          </button>
          <div className="float-right mt-3">
            <div className="d-flex align-items-center">
              <div className="app-header__language">Tiếng Việt</div>
              <div className="app-header__notifications">
                <i className="tio-notifications_outlined" />
              </div>
              <div className="app-header__user">
                <div className="app-header__display-name">Vu Dang</div>
                <div className="app-header__username">Administrator</div>
              </div>
              <div className="app-header__avatar ml-3 mr-3">
                {/* <img className="mr-1 app-header__avatar-img" src="public/assets/img/avatar.jpg" alt="" /> */}
                <ConfigProvider colors={["red", "green", "blue"]}>
                  <Avatar
                    maxInitials={1}
                    round={true}
                    size="34"
                    name="Dang Tuan Vu"
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </header>
      </div>
      {display && (
        <div
          className={classNames(
            "header__overlay",
            { "header__display-block": display },
          )}
          onClick={handleOffOverlay}
        >
          <div className=" header__list">
            {menus &&
              menus.length > 0 &&
              menus.map((menu, index) => (
                <div className="header__menu d-flex" key={index}>
                  <div className="header__menu-icon">
                    <i className={menu?.icon} />
                  </div>
                  <div className="header__menu-title">{menu?.title}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AppHeader;
