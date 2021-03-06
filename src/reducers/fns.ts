import { Action, ActionCreator, Meta } from "../actions/interfaces";
import { isType } from "../actions/utils";
import { CasesFn, Handler, Reducer, ReducerFn } from "./interfaces";

/**
 * Case function matches ACtionCreator to handler.
 */
export const caseFn = <S, P, M extends Meta>(
  actionCreator: ActionCreator<P, M>,
  handler: Handler<S, P>,
): Reducer<S, P, M> => (s: S, a: Action<P, M>) => (isType(actionCreator)(a) ? handler(s, a.payload) : s);

/**
 * Case function matches multiple ActionCreators to a handler.
 */
export const casesFn: CasesFn = <S>(
  actionCreators: Array<ActionCreator<any, any>>,
  handler: Handler<S, any>,
): Reducer<S, any, any> =>
  actionCreators.reduceRight((ra, ac) => (s: S, a: any) => ra(caseFn(ac, handler)(s, a), a), (s: S, _: any) => s);

/**
 * Compose caseFn and casesFn.
 */
export const reducerFn: ReducerFn = <S>(...cases: Array<Reducer<S, any, any>>): Reducer<S, any, any> => (
  state: S,
  action: any,
) => cases.reduceRight((ra, r) => (s: S, a: any) => ra(r(s, a), a), (s: S, _: any) => s)(state, action);

/**
 * Compose caseFn and casesFn with initial state.
 */
export const reducerDefaultFn = <S>(initialState: S, ...cases: Array<Reducer<S, any, any>>) => (
  s: S | undefined = initialState,
  a: any,
): S => (reducerFn as any)(...cases)(s, a);
