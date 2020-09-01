import { renderRouteChildren } from "helpers/react-router";
import React from "react";
import { Switch } from "react-router";
import { RouteConfigComponentProps } from "react-router-config";

function PriceListView(props: Partial<RouteConfigComponentProps>) {
  const { route } = props;

  return <Switch>{renderRouteChildren(route)}</Switch>;
}

export default PriceListView;
