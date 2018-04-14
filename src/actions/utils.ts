import { Action, ActionCreator, Meta } from "./interfaces";

export function isType<P, M extends Meta>(
  action: Action<any, any>,
  actionCreator: ActionCreator<P, M>,
): action is Action<P, M> {
  return action.type === actionCreator.type;
}
