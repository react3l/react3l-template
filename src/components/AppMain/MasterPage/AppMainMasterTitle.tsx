import { TFunction } from "i18next";
import React from "react";
import { ReactNode } from "react";
import { UseMaster } from "services/pages/master-service";

export interface AppMainMasterTitle extends UseMaster {
  translate?: TFunction;
  children?: ReactNode;
}

export function AppMainMasterTitle(props: AppMainMasterTitle) {
  const { translate, handleGoCreate, children } = props;

  return (
    <>
      <div className="page__header d-flex align-items-center justify-content-between">
        <div className="page__title">{children}</div>
      </div>
    </>
  );
}
