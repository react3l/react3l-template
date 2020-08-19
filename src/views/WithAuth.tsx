import React, { useContext, useState } from 'react';
import Spin from 'antd/lib/spin';
import { useTranslation } from 'react-i18next';
import { MenuRouteContext } from './AppContext';
import _ from 'lodash';

export interface WithAuthProps {
  children?: any;
  path?: string;
}
export interface AuthState {
  isAuth: boolean;
}

export default function WithAuth(WrappedComponent: any, pathName: string) {
  return class extends React.Component<{}, {}> {
    render() {
      return (
        <WithCheckAuth path={pathName}>
          <WrappedComponent />
        </WithCheckAuth>
      );
    }
  };
}

export function WithCheckAuth(props: WithAuthProps) {
  const [translate] = useTranslation();
  const { children, path } = props;
  const mapper = useContext<Record<string, number>>(MenuRouteContext);
  const [isAuth, setIsAuth] = useState<boolean>(false);


  return (
    <>
      {isAuth ? (
        <>{children}</>
      ) : (
          <Spin className="checking" tip={translate('pages.checking.authority')} />
        )}
    </>
  );
}
