import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";

export const API_SIGNALR_ROUTE: string = "/rpc/utils/signalr";

export class SignalRService {
  private rConnection: HubConnection;

  constructor() {
    this.rConnection = new HubConnectionBuilder()
      .withUrl(API_SIGNALR_ROUTE)
      .configureLogging(LogLevel.Information)
      .build();
    this.rConnection
      .start()
      .then(() => {
        // tslint:disable-next-line:no-console
      })
      .catch((err) => {
        // tslint:disable-next-line:no-console
      });
  }

  registerChannel = (channel: string, callback: any) => {
    this.rConnection.on(channel, (data) => {
      // tslint:disable-next-line:no-console
      if (typeof callback === "function") {
        callback(data);
      }
    });
  };

  closeConnection = () => {
    this.rConnection.stop().then(() => {
      // tslint:disable-next-line:no-console
    });
  };
}

const signalRService = new SignalRService();
export default signalRService;
