import { Action, ActionCreator, ActionCreatorFactory, AsyncActionCreators, Done, Fail, Meta } from "./interfaces";

/**
 * Factory for creating actions.
 * @param group
 */
export const actionCreatorFactory = (group: string): ActionCreatorFactory => {
  const ac = actionCreator(group);
  return Object.assign(ac, { async: asyncActionCreators(group, ac) });
};

/**
 * Syncronous Actions creator.
 * @param action
 * @param [commonMeta]
 * @param [error]
 */
const actionCreator = (group: string) => <P = void, M extends object = Meta>(
  action: string,
  commonMeta?: M,
  error?: boolean,
): ActionCreator<P, M> => {
  const type = group + "/" + action;
  return Object.assign(
    <M2 extends object>(payload: P, meta?: M2): Action<P, M & M2 & Meta> => ({
      type,
      payload,
      meta: Object.assign({ $$typeChain: [] } as Meta, commonMeta, meta),
      error: error === true || !(error === false || !(payload instanceof Error)),
    }),
    {
      type,
      match: <M2 extends Meta>(a: Action<any, any>): a is Action<P, M & M2> => a.type === type,
    },
  );
};

/**
 * Async Actions creator factory.
 * @param result
 * @param [commonMeta]
 */
const asyncActionCreators = (
  group: string,
  ac: <P, M extends object>(a: string, b?: M, c?: boolean) => ActionCreator<P, M>,
) => <P, S, E, M extends object>(result: string, commonMeta?: M): AsyncActionCreators<P, S, E, M> => ({
  type: group + "/" + result,
  started: ac<P, M>(`${result}_STARTED`, commonMeta),
  done: ac<Done<P, S>, M>(`${result}_DONE`, commonMeta),
  failed: ac<Fail<P, E>, M>(`${result}_FAILED`, commonMeta, true),
});
