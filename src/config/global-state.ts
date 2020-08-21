import { User } from "models/User";
import vi from "i18n/vi.json";
import nameof from "ts-nameof.macro";

export interface GlobalState {
  /**
   * App language
   */
  language: string;

  /**
   * User access token
   */
  accessToken?: string;

  /**
   * Current user profile
   */
  user?: User;
  /**
   * Display quick menu
   */

  display?: boolean;

  /**
   * Toggle menu
   */

  toggle?: boolean;
}

export const initialGlobalState: GlobalState = {
  language: nameof(vi),

  accessToken: null,

  user: null,
};
