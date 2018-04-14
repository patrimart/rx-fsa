import { Action, ActionCreator, ActionCreatorFactory, AsyncActionCreators, Done, Fail, Meta } from "./interfaces";

export function actionCreatorFactory(prefix: string): ActionCreatorFactory {
  function actionCreator<P, M extends object>(activity: string, commonMeta?: M, error = false): ActionCreator<P, M> {
    const type = prefix + "/" + activity;
    return Object.assign(
      <M2 extends object>(payload: P, meta: M2): Action<P, M & M2 & Meta> => ({
        type,
        payload,
        meta: Object.assign({ $$typeChain: [""] }, commonMeta, meta),
        error,
      }),
      {
        type,
        match: <M2 extends Meta>(action: Action<any, any>): action is Action<P, M & M2> => action.type === type,
      },
    );
  }

  function asyncActionCreators<P, S, E, M extends object>(
    type: string,
    commonMeta?: M,
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
