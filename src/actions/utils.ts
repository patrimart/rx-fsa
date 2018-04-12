import { Action, ActionCreator } from "./interfaces";

export function isType<P, M>(action: Action, actionCreator: ActionCreator<P, M>): action is Action<P, M> {
  return action.type === actionCreator.type;
}
