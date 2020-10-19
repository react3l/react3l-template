import React from "react";
import AppMain from "components/AppMain/AppMain";
import { join } from "path";
import { RouteConfig } from "react-router-config";
import { ROOT_ROUTE } from "config/route-consts";

import {
  ACTION_ROUTE,
  ACTION_MASTER_ROUTE,
  ACTION_DETAIL_ROUTE,
} from "config/route-consts";

import {
  APP_USER_ROUTE,
  APP_USER_MASTER_ROUTE,
  APP_USER_DETAIL_ROUTE,
} from "config/route-consts";

import {
  APP_USER_PERMISSION_ROUTE,
  APP_USER_PERMISSION_MASTER_ROUTE,
  APP_USER_PERMISSION_DETAIL_ROUTE,
} from "config/route-consts";

import {
  DISTRICT_ROUTE,
  DISTRICT_MASTER_ROUTE,
  DISTRICT_DETAIL_ROUTE,
} from "config/route-consts";

import {
  EVENT_MESSAGE_ROUTE,
  EVENT_MESSAGE_MASTER_ROUTE,
  EVENT_MESSAGE_DETAIL_ROUTE,
} from "config/route-consts";

import {
  FIELD_ROUTE,
  FIELD_MASTER_ROUTE,
  FIELD_DETAIL_ROUTE,
} from "config/route-consts";

import {
  FIELD_TYPE_ROUTE,
  FIELD_TYPE_MASTER_ROUTE,
  FIELD_TYPE_DETAIL_ROUTE,
} from "config/route-consts";

import {
  MENU_ROUTE,
  MENU_MASTER_ROUTE,
  MENU_DETAIL_ROUTE,
} from "config/route-consts";

import {
  ORGANIZATION_ROUTE,
  ORGANIZATION_MASTER_ROUTE,
  ORGANIZATION_DETAIL_ROUTE,
} from "config/route-consts";

import {
  PAGE_ROUTE,
  PAGE_MASTER_ROUTE,
  PAGE_DETAIL_ROUTE,
} from "config/route-consts";

import {
  PERMISSION_CONTENT_ROUTE,
  PERMISSION_CONTENT_MASTER_ROUTE,
  PERMISSION_CONTENT_DETAIL_ROUTE,
} from "config/route-consts";

import {
  PERMISSION_ROUTE,
  PERMISSION_MASTER_ROUTE,
  PERMISSION_DETAIL_ROUTE,
} from "config/route-consts";

import {
  PERMISSION_OPERATOR_ROUTE,
  PERMISSION_OPERATOR_MASTER_ROUTE,
  PERMISSION_OPERATOR_DETAIL_ROUTE,
} from "config/route-consts";

import {
  POSITION_ROUTE,
  POSITION_MASTER_ROUTE,
  POSITION_DETAIL_ROUTE,
} from "config/route-consts";

import {
  PROVIDER_ROUTE,
  PROVIDER_MASTER_ROUTE,
  PROVIDER_DETAIL_ROUTE,
} from "config/route-consts";

import {
  PROVINCE_ROUTE,
  PROVINCE_MASTER_ROUTE,
  PROVINCE_DETAIL_ROUTE,
} from "config/route-consts";

import {
  ROLE_ROUTE,
  ROLE_MASTER_ROUTE,
  ROLE_DETAIL_ROUTE,
} from "config/route-consts";

import {
  SITE_ROUTE,
  SITE_MASTER_ROUTE,
  SITE_DETAIL_ROUTE,
} from "config/route-consts";

import {
  THEME_ROUTE,
  THEME_MASTER_ROUTE,
  THEME_DETAIL_ROUTE,
} from "config/route-consts";

import {
  WARD_ROUTE,
  WARD_MASTER_ROUTE,
  WARD_DETAIL_ROUTE,
} from "config/route-consts";

const ActionView = React.lazy(() => import("views/ActionView/ActionView"));
const ActionDetailView = React.lazy(() =>
  import("views/ActionView/ActionView"),
);
const ActionMasterView = React.lazy(() =>
  import("views/ActionView/ActionView"),
);

const AppUserView = React.lazy(() => import("views/AppUserView/AppUserView"));
const AppUserDetailView = React.lazy(() =>
  import("views/AppUserView/AppUserView"),
);
const AppUserMasterView = React.lazy(() =>
  import("views/AppUserView/AppUserView"),
);

const AppUserPermissionView = React.lazy(() =>
  import("views/AppUserPermissionView/AppUserPermissionView"),
);
const AppUserPermissionDetailView = React.lazy(() =>
  import("views/AppUserPermissionView/AppUserPermissionView"),
);
const AppUserPermissionMasterView = React.lazy(() =>
  import("views/AppUserPermissionView/AppUserPermissionView"),
);

const DistrictView = React.lazy(() =>
  import("views/DistrictView/DistrictView"),
);
const DistrictDetailView = React.lazy(() =>
  import("views/DistrictView/DistrictView"),
);
const DistrictMasterView = React.lazy(() =>
  import("views/DistrictView/DistrictView"),
);

const EventMessageView = React.lazy(() =>
  import("views/EventMessageView/EventMessageView"),
);
const EventMessageDetailView = React.lazy(() =>
  import("views/EventMessageView/EventMessageView"),
);
const EventMessageMasterView = React.lazy(() =>
  import("views/EventMessageView/EventMessageView"),
);

const FieldView = React.lazy(() => import("views/FieldView/FieldView"));
const FieldDetailView = React.lazy(() => import("views/FieldView/FieldView"));
const FieldMasterView = React.lazy(() => import("views/FieldView/FieldView"));

const FieldTypeView = React.lazy(() =>
  import("views/FieldTypeView/FieldTypeView"),
);
const FieldTypeDetailView = React.lazy(() =>
  import("views/FieldTypeView/FieldTypeView"),
);
const FieldTypeMasterView = React.lazy(() =>
  import("views/FieldTypeView/FieldTypeView"),
);

const MenuView = React.lazy(() => import("views/MenuView/MenuView"));
const MenuDetailView = React.lazy(() => import("views/MenuView/MenuView"));
const MenuMasterView = React.lazy(() => import("views/MenuView/MenuView"));

const OrganizationTreeView = React.lazy(() =>
  import("views/OrganizationTreeView/OrganizationTreeView"),
);
const OrganizationTreeDetailView = React.lazy(() =>
  import("views/OrganizationTreeView/OrganizationTreeView"),
);
const OrganizationTreeMasterView = React.lazy(() =>
  import("views/OrganizationTreeView/OrganizationTreeView"),
);

const PageView = React.lazy(() => import("views/PageView/PageView"));
const PageDetailView = React.lazy(() => import("views/PageView/PageView"));
const PageMasterView = React.lazy(() => import("views/PageView/PageView"));

const PermissionContentView = React.lazy(() =>
  import("views/PermissionContentView/PermissionContentView"),
);
const PermissionContentDetailView = React.lazy(() =>
  import("views/PermissionContentView/PermissionContentView"),
);
const PermissionContentMasterView = React.lazy(() =>
  import("views/PermissionContentView/PermissionContentView"),
);

const PermissionView = React.lazy(() =>
  import("views/PermissionView/PermissionView"),
);
const PermissionDetailView = React.lazy(() =>
  import("views/PermissionView/PermissionView"),
);
const PermissionMasterView = React.lazy(() =>
  import("views/PermissionView/PermissionView"),
);

const PermissionOperatorView = React.lazy(() =>
  import("views/PermissionOperatorView/PermissionOperatorView"),
);
const PermissionOperatorDetailView = React.lazy(() =>
  import("views/PermissionOperatorView/PermissionOperatorView"),
);
const PermissionOperatorMasterView = React.lazy(() =>
  import("views/PermissionOperatorView/PermissionOperatorView"),
);

const PositionView = React.lazy(() =>
  import("views/PositionView/PositionView"),
);
const PositionDetailView = React.lazy(() =>
  import("views/PositionView/PositionView"),
);
const PositionMasterView = React.lazy(() =>
  import("views/PositionView/PositionView"),
);

const ProviderView = React.lazy(() =>
  import("views/ProviderView/ProviderView"),
);
const ProviderDetailView = React.lazy(() =>
  import("views/ProviderView/ProviderView"),
);
const ProviderMasterView = React.lazy(() =>
  import("views/ProviderView/ProviderView"),
);

const ProvinceView = React.lazy(() =>
  import("views/ProvinceView/ProvinceView"),
);
const ProvinceDetailView = React.lazy(() =>
  import("views/ProvinceView/ProvinceView"),
);
const ProvinceMasterView = React.lazy(() =>
  import("views/ProvinceView/ProvinceView"),
);

const RoleView = React.lazy(() => import("views/RoleView/RoleView"));
const RoleDetailView = React.lazy(() => import("views/RoleView/RoleView"));
const RoleMasterView = React.lazy(() => import("views/RoleView/RoleView"));

const SiteView = React.lazy(() => import("views/SiteView/SiteView"));
const SiteDetailView = React.lazy(() => import("views/SiteView/SiteView"));
const SiteMasterView = React.lazy(() => import("views/SiteView/SiteView"));

const ThemeView = React.lazy(() => import("views/ThemeView/ThemeView"));
const ThemeDetailView = React.lazy(() => import("views/ThemeView/ThemeView"));
const ThemeMasterView = React.lazy(() => import("views/ThemeView/ThemeView"));

const WardView = React.lazy(() => import("views/WardView/WardView"));
const WardDetailView = React.lazy(() => import("views/WardView/WardView"));
const WardMasterView = React.lazy(() => import("views/WardView/WardView"));

export const routes: RouteConfig[] = [
  {
    path: ROOT_ROUTE,
    key: "main",
    component: AppMain,
    routes: [
      {
        path: ACTION_ROUTE,
        component: ActionView,
        children: [
          {
            path: join(ACTION_DETAIL_ROUTE, ":id"),
            component: ActionDetailView,
          },
          {
            path: ACTION_MASTER_ROUTE,
            component: ActionMasterView,
          },
        ],
      },

      {
        path: APP_USER_ROUTE,
        component: AppUserView,
        children: [
          {
            path: join(APP_USER_DETAIL_ROUTE, ":id"),
            component: AppUserDetailView,
          },
          {
            path: APP_USER_MASTER_ROUTE,
            component: AppUserMasterView,
          },
        ],
      },

      {
        path: APP_USER_PERMISSION_ROUTE,
        component: AppUserPermissionView,
        children: [
          {
            path: join(APP_USER_PERMISSION_DETAIL_ROUTE, ":id"),
            component: AppUserPermissionDetailView,
          },
          {
            path: APP_USER_PERMISSION_MASTER_ROUTE,
            component: AppUserPermissionMasterView,
          },
        ],
      },

      {
        path: DISTRICT_ROUTE,
        component: DistrictView,
        children: [
          {
            path: join(DISTRICT_DETAIL_ROUTE, ":id"),
            component: DistrictDetailView,
          },
          {
            path: DISTRICT_MASTER_ROUTE,
            component: DistrictMasterView,
          },
        ],
      },

      {
        path: EVENT_MESSAGE_ROUTE,
        component: EventMessageView,
        children: [
          {
            path: join(EVENT_MESSAGE_DETAIL_ROUTE, ":id"),
            component: EventMessageDetailView,
          },
          {
            path: EVENT_MESSAGE_MASTER_ROUTE,
            component: EventMessageMasterView,
          },
        ],
      },

      {
        path: FIELD_ROUTE,
        component: FieldView,
        children: [
          {
            path: join(FIELD_DETAIL_ROUTE, ":id"),
            component: FieldDetailView,
          },
          {
            path: FIELD_MASTER_ROUTE,
            component: FieldMasterView,
          },
        ],
      },

      {
        path: FIELD_TYPE_ROUTE,
        component: FieldTypeView,
        children: [
          {
            path: join(FIELD_TYPE_DETAIL_ROUTE, ":id"),
            component: FieldTypeDetailView,
          },
          {
            path: FIELD_TYPE_MASTER_ROUTE,
            component: FieldTypeMasterView,
          },
        ],
      },

      {
        path: MENU_ROUTE,
        component: MenuView,
        children: [
          {
            path: join(MENU_DETAIL_ROUTE, ":id"),
            component: MenuDetailView,
          },
          {
            path: MENU_MASTER_ROUTE,
            component: MenuMasterView,
          },
        ],
      },

      {
        path: ORGANIZATION_ROUTE,
        component: OrganizationTreeView,
        children: [
          {
            path: join(ORGANIZATION_DETAIL_ROUTE, ":id"),
            component: OrganizationTreeDetailView,
          },
          {
            path: ORGANIZATION_MASTER_ROUTE,
            component: OrganizationTreeMasterView,
          },
        ],
      },

      {
        path: PAGE_ROUTE,
        component: PageView,
        children: [
          {
            path: join(PAGE_DETAIL_ROUTE, ":id"),
            component: PageDetailView,
          },
          {
            path: PAGE_MASTER_ROUTE,
            component: PageMasterView,
          },
        ],
      },

      {
        path: PERMISSION_CONTENT_ROUTE,
        component: PermissionContentView,
        children: [
          {
            path: join(PERMISSION_CONTENT_DETAIL_ROUTE, ":id"),
            component: PermissionContentDetailView,
          },
          {
            path: PERMISSION_CONTENT_MASTER_ROUTE,
            component: PermissionContentMasterView,
          },
        ],
      },

      {
        path: PERMISSION_ROUTE,
        component: PermissionView,
        children: [
          {
            path: join(PERMISSION_DETAIL_ROUTE, ":id"),
            component: PermissionDetailView,
          },
          {
            path: PERMISSION_MASTER_ROUTE,
            component: PermissionMasterView,
          },
        ],
      },

      {
        path: PERMISSION_OPERATOR_ROUTE,
        component: PermissionOperatorView,
        children: [
          {
            path: join(PERMISSION_OPERATOR_DETAIL_ROUTE, ":id"),
            component: PermissionOperatorDetailView,
          },
          {
            path: PERMISSION_OPERATOR_MASTER_ROUTE,
            component: PermissionOperatorMasterView,
          },
        ],
      },

      {
        path: POSITION_ROUTE,
        component: PositionView,
        children: [
          {
            path: join(POSITION_DETAIL_ROUTE, ":id"),
            component: PositionDetailView,
          },
          {
            path: POSITION_MASTER_ROUTE,
            component: PositionMasterView,
          },
        ],
      },

      {
        path: PROVIDER_ROUTE,
        component: ProviderView,
        children: [
          {
            path: join(PROVIDER_DETAIL_ROUTE, ":id"),
            component: ProviderDetailView,
          },
          {
            path: PROVIDER_MASTER_ROUTE,
            component: ProviderMasterView,
          },
        ],
      },

      {
        path: PROVINCE_ROUTE,
        component: ProvinceView,
        children: [
          {
            path: join(PROVINCE_DETAIL_ROUTE, ":id"),
            component: ProvinceDetailView,
          },
          {
            path: PROVINCE_MASTER_ROUTE,
            component: ProvinceMasterView,
          },
        ],
      },

      {
        path: ROLE_ROUTE,
        component: RoleView,
        children: [
          {
            path: join(ROLE_DETAIL_ROUTE, ":id"),
            component: RoleDetailView,
          },
          {
            path: ROLE_MASTER_ROUTE,
            component: RoleMasterView,
          },
        ],
      },

      {
        path: SITE_ROUTE,
        component: SiteView,
        children: [
          {
            path: join(SITE_DETAIL_ROUTE, ":id"),
            component: SiteDetailView,
          },
          {
            path: SITE_MASTER_ROUTE,
            component: SiteMasterView,
          },
        ],
      },

      {
        path: THEME_ROUTE,
        component: ThemeView,
        children: [
          {
            path: join(THEME_DETAIL_ROUTE, ":id"),
            component: ThemeDetailView,
          },
          {
            path: THEME_MASTER_ROUTE,
            component: ThemeMasterView,
          },
        ],
      },

      {
        path: WARD_ROUTE,
        component: WardView,
        children: [
          {
            path: join(WARD_DETAIL_ROUTE, ":id"),
            component: WardDetailView,
          },
          {
            path: WARD_MASTER_ROUTE,
            component: WardMasterView,
          },
        ],
      },
    ],
  },
];
