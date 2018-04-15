import { Action, ActionCreator, Meta } from "./interfaces";

export const isType = <P, M extends Meta>(
  action: Action<any, any>,
  actionCreator: ActionCreator<P, M>,
): action is Action<P, M> => action.type === actionCreator.type;
