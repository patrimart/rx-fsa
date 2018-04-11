import { Action, ActionCreator } from "./interfaces";

export function isType<P>(action: Action, actionCreator: ActionCreator<P>): action is Action<P> {
  return action.type === actionCreator.type;
}
