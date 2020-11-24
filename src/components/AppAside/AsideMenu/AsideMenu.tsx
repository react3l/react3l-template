import Menu from 'antd/lib/menu';
import classNames from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteConfig } from 'react-router-config';
import { Link, RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './AsideMenu.scss';
const { SubMenu } = Menu;

export interface IDefaultSidebarProps extends RouteComponentProps {
  item: RouteConfig;
}

function AsideMenu(props: IDefaultSidebarProps) {
  const { staticContext, item, ...rest } = props;
  const [translate] = useTranslation();

  return (
    <>
      {
        props.item.notTitle ?
        <div className="menu-title">{translate(props.item.name)}</div> :
        <>
          {
            props.item.children ?
            <SubMenu
              key={props.item.key ? props.item.key : uuidv4()}
              title={
                <>
                  {props.item.icon && <i className={classNames("icon-fontsize", props.item.icon)} />}
                  <span className="ml-2">{translate(props.item.name)}</span>
                </>
              }
              {...rest}>
                {props.item.children.map((subItem: RouteConfig) => (
                  subItem.children ? 
                  <>
                    <SubMenu
                      key={subItem.key ? subItem.key : uuidv4()}
                      title={
                        <>
                          {subItem.children && subItem.children.length > 0 && (
                            <>
                              {subItem.icon && <i className={classNames("icon-fontsize", subItem.icon)} />}
                              <span className="ml-2">{translate(subItem.name)}</span>
                            </>
                          )}
                        </>
                      }
                      {...rest}>
                        {subItem.children.map((currentItem: RouteConfig) => (
                          <Menu.Item key={currentItem.path + ''} {...rest}>
                            <Link to={currentItem.path as string}>
                              {currentItem.icon && <i className={classNames("icon-fontsize", currentItem.icon)} />}
                              <span className="ml-2">{translate(currentItem.name)}</span>
                            </Link>
                          </Menu.Item>
                        ))}
                    </SubMenu>
                  </> : 
                  <Menu.Item key={subItem.path + ''} {...rest}>
                      <Link to={subItem.path as string}>
                        {subItem.icon && <i className={classNames("icon-fontsize", subItem.icon)} />}
                        <span className="ml-2">{translate(subItem.name)}</span>
                      </Link>
                  </Menu.Item>
                ))}
            </SubMenu> :
            <Menu.Item key={props.item.path + ''} {...rest}>
              <Link to={props.item.path as string}>
                {props.item.icon && <i className={classNames("icon-fontsize", props.item.icon)} />}
                <span className="ml-2">{translate(props.item.name)}</span>
              </Link>
            </Menu.Item>
          }
        </>
      }
    </>
  );
}

export default AsideMenu;
