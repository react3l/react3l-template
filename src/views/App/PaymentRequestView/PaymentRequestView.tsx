// import { renderRouteChildren } from 'helpers/react-router';
import React from 'react';
import { Switch } from 'react-router';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import 'views/App/PaymentRequestView/PaymentRequestView.scss';
import PaymentRequestDetailView from './PaymentRequestDetailView/PaymentRequestDetailView';
import PaymentRequestMasterView from './PaymentRequestMasterView/PaymentRequestMasterView';

function PaymentRequestView(props?: RouteConfigComponentProps) {
  const { route } = props;
  return (
    <Switch>
      {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { PaymentRequestMasterView, PaymentRequestDetailView };
export default PaymentRequestView;
