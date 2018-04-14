import { Action, ActionCreator, ActionCreatorFactory, AsyncActionCreators, Done, Fail, Meta } from "./interfaces";

export function actionCreatorFactory(prefix: string): ActionCreatorFactory {
  function actionCreator<P, M extends Meta>(
    activity: string,
    commonMeta = {} as M,
    error = false,
  ): ActionCreator<P, M> {
    const type = prefix + "/" + activity;
    return Object.assign(
      <M2 extends Meta>(payload: P, meta: M2): Action<P, M & M2> => ({
        type,
        payload,
        meta: Object.assign(commonMeta, meta),
        error,
      }),
      {
        type,
        match: <M2 extends Meta>(action: Action<any, any>): action is Action<P, M & M2> => action.type === type,
      },
    );
  }

  function asyncActionCreators<P, S, E, M extends Meta>(
    type: string,
    commonMeta = {} as M,
  ): AsyncActionCreators<P, S, E, M> {
    return {
      type: prefix + "/" + type,
      started: actionCreator<P, M>(`${type}_STARTED`, commonMeta),
      done: actionCreator<Done<P, S>, M>(`${type}_DONE`, commonMeta),
      failed: actionCreator<Fail<P, E>, M>(`${type}_FAILED`, commonMeta, true),
    };
  }

  return Object.assign(actionCreator, { async: asyncActionCreators });
}
