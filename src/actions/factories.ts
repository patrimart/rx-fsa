import { Action, ActionCreator, ActionCreatorFactory, AsyncActionCreators, Done, Fail } from "./interfaces";

export function actionCreatorFactory(prefix: string): ActionCreatorFactory {
  const base = prefix + "/";

  function actionCreator<P, M>(activity: string, commonMeta?: M, error?: true): ActionCreator<P, M> {
    const type = base + activity;
    return Object.assign(
      <M2>(payload: P, meta?: M2): Action<P, M & M2> => ({
        type,
        payload,
        meta: Object.assign(commonMeta, meta),
        error,
      }),
      {
        type,
        match: (action: Action): action is Action<P> => action.type === type,
      },
    );
  }

  function asyncActionCreators<P, S, E, M>(type: string, commonMeta?: M): AsyncActionCreators<P, S, E, M> {
    return {
      type: base + type,
      started: actionCreator<P, M>(`${type}_STARTED`, commonMeta),
      done: actionCreator<Done<P, S>, M>(`${type}_DONE`, commonMeta),
      failed: actionCreator<Fail<P, E>, M>(`${type}_FAILED`, commonMeta, true),
    };
  }

  return Object.assign(actionCreator, { async: asyncActionCreators });
}
