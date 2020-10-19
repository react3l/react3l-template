import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './EventMessageView.scss';
import EventMessageDetail from './EventMessageDetail/EventMessageDetail';
import EventMessageMaster from './EventMessageMaster/EventMessageMaster';

function EventMessageView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { EventMessageMaster, EventMessageDetail };
export default EventMessageView;
