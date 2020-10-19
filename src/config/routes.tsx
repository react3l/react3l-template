import React from "react";
import { RouteConfig } from "react-router-config";
import AppMain from "components/AppMain/AppMain";

export const routes: RouteConfig[] = [
  {
    key: "main",
    path: "/",
    component: AppMain,
    routes: [
    ],
  },
];
