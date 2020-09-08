import React from "react";
import "./AppHeader.scss";
import Avatar, { ConfigProvider } from "react-avatar";
import { GlobalState } from "config/global-state";
import { setGlobal, useGlobal } from 'reactn';
function AppHeader() {
  const [display, setDisplay] = React.useState<boolean>(false);
  const [displayHeader] = useGlobal<GlobalState>('display');

  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);

  const handleClick = React.useCallback(() => {
    setGlobal<GlobalState>({ display: true });
    setDisplay(true);
  }, [setDisplay]);

  const handleToggleMenu = React.useCallback(() => {
    const toggle = !toggleMenu;
    setToggleMenu(toggle);
    setGlobal<GlobalState>({ toggle });
  }, [
    setToggleMenu,
    toggleMenu,
  ]);

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
    <div>
      <header className="app-header d-flex justify-content-between">
        <div className="app-header__toggle" onClick={handleToggleMenu}>
          <i className="tio-menu_hamburger" />
        </div>
        <div className="float-right ">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm component__btn-primary mr-3"
              onClick={handleClick}
            >
              <i className="tio-add d-flex justify-content-center" />
            </button>
            <div className="app-header__language mt-3">Tiếng Việt</div>
            <div className="app-header__notifications mt-3">
              <i className="tio-notifications_outlined" />
            </div>
            <div className="app-header__user mt-3">
              <div className="app-header__display-name">Vu Dang</div>
              <div className="app-header__username">Administrator</div>
            </div>
            <div className="app-header__avatar mt-3 ml-3 mr-3">
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
      {(display === true && displayHeader === true) && (
        <div className=" header__list">
          {menus &&
            menus.length > 0 &&
            menus.map((menu, index) => (
              <div className="header__menu d-flex align-items-center" key={index}>
                <div className="header__menu-icon">
                  <i className={menu?.icon} />
                </div>
                <div className="header__menu-title">{menu?.title}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AppHeader;
