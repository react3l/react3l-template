import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';
import './FieldTypeView.scss';
import FieldTypeDetail from './FieldTypeDetail/FieldTypeDetail';
import FieldTypeMaster from './FieldTypeMaster/FieldTypeMaster';

function FieldTypeView(props: RouteConfigComponentProps) {
  const {route} = props;

  return (
    <Switch>
        {route && renderRoutes(route.children)}
    </Switch>
  );
}

export { FieldTypeMaster, FieldTypeDetail };
export default FieldTypeView;
