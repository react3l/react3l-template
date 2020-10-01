import path from "path";
import React from "react";
import { useHistory } from "react-router";
import nameof from "ts-nameof.macro";

export class RouterService {
  public useGoBack(): [() => void] {
    const history = useHistory();

    return [
      React.useCallback(() => {
        history.goBack();
      }, [history]),
    ];
  }

  public useCancel(): [() => void] {
    const history = useHistory();

    return [
      React.useCallback(() => {
        history.goBack();
      }, [history]),
    ];
  }

  public useMasterNavigation(
    baseRoute: string,
  ): [
    () => void,
    (id: any) => () => void,
    (node: any) => () => void,
    () => void,
  ] {
    const history = useHistory();

    const handleGoCreate = React.useCallback(() => {
      history.push(path.join(baseRoute, nameof("create")));
    }, [baseRoute, history]);

    const handleGoCreateTree = React.useCallback(
      (node: any) => {
        return () => {
          history.push(
            path.join(baseRoute, nameof("create") + `?id=${node.id}`),
          );
        };
      },
      [baseRoute, history],
    );

    const handleGoDetail = React.useCallback(
      (id: any) => {
        return () => {
          history.push(path.join(baseRoute, `${id}`));
        };
      },
      [baseRoute, history],
    );

    const handleGoBase = React.useCallback(() => {
      history.replace(baseRoute);
    }, [baseRoute, history]);

    return [handleGoCreate, handleGoDetail, handleGoCreateTree, handleGoBase];
  }
}

export const routerService: RouterService = new RouterService();
