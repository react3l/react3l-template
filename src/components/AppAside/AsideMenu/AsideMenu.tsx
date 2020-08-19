import Menu from 'antd/lib/menu';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteConfig } from 'react-router-config';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './AsideMenu.scss';
import AsideContent from '../AsideContent/AsideContent';
const { SubMenu } = Menu;

export interface IDefaultSidebarProps extends RouteComponentProps {
  item: RouteConfig;
}

function AsideMenu(props: IDefaultSidebarProps) {
  const { staticContext, item, ...rest } = props;
  const [translate] = useTranslation();

  if (props.item.children) {
    return (
      <>
        {/* {item.isShow && ( */}
        <SubMenu
          key={props.item.key ? props.item.key : uuidv4()}
          title={
            <div className="ml-3">
              {props.item.children && props.item.children.length > 0 && (
                <>
                  {props.item.icon && <i className={props.item.icon} />}
                  <span className="ml-2">{translate(props.item.name)}</span>
                </>
              )}
              {!props.item.children && !props.item.notTitle && (
                <AsideContent item={props.item} />
              )}
            </div>
          }
          {...rest}
        >
          {props.item.children.map((subItem: RouteConfig) => (
            <AsideMenu
              {...props}
              key={subItem.path as string}
              item={subItem}
            />
          ))}
        </SubMenu>
        {/* )} */}
      </>
    );
  }

  if (props.item.notTitle) {
    return <div className="menu-title">{translate(props.item.name)}</div>;
  }

  return <AsideContent item={props.item} {...props} />;
}

export default AsideMenu;
