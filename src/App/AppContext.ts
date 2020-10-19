import { SignalRService } from "services/signalr-service";
import { createContext, Dispatch } from "react";
import { RouteConfig } from "react-router-config";
import { AppMessageService } from "services/app-message-service";
import { AppAction, AppState } from "./AppStore";
export const SignalRContext = createContext<SignalRService>(null);
export const PermissionContext = createContext<string[]>([]);
export const MenuContext = createContext<RouteConfig[]>([]);
export const ActionContext = createContext<string[]>([]);
export const MenuRouteContext = createContext<Record<string, number>>({});
export const AppMessageContext = createContext<AppMessageService>(null);
export const AppDispatchContext = createContext<Dispatch<AppAction>>(null);
export const AppStateContext = createContext<AppState>(null);

export const AppStoreContext = createContext<[AppState, Dispatch<AppAction>]>([
  null,
  null,
]);
