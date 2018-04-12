import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, switchMap } from "rxjs/operators";

import { Action, AsyncActionCreators } from "../actions";
import { actionChainer } from "./utils";

export type ResponseFns<P, R> = (params: P, resp: R, meta: any) => ReadonlyArray<Action<any>>;

const filterMapAsyncBase = (mapper: typeof mergeMap) => <P, R, E, M>(
  action: AsyncActionCreators<P, R, E, M>,
  svcFn: (params: P) => Observable<R>,
  failureFn: ResponseFns<P, E> = () => [],
  successFn: ResponseFns<P, R> = () => [],
) => (obs: Observable<Action<any>>) => {
  const ac = actionChainer(action.started.type);
  return obs.pipe(
    filter(action.started.match),
    map(({ payload: params, meta }) => ({ params, meta: ac(meta || undefined) })),
    mapper(({ params, meta }) =>
      svcFn(params).pipe(
        mergeMap((result: R) => from([action.done({ params, result }, meta)].concat(successFn(params, result, meta)))),
        catchError(error => from([action.failed({ params, error }, meta)].concat(failureFn(params, error, meta)))),
      ),
    ),
  );
};

/**
 * Filters on the `started` Action of the AsyncActionCreator.
 * Invokes the srvFn (commonly a http request).
 * On success, returns the `done` Action with optional success Actions.
 * Else, returns the `failed` Action with optional failure Actions.
 */
export const filterConcatAsync = filterMapAsyncBase(concatMap);

export const filterExhaustAsync = filterMapAsyncBase(exhaustMap);

export const filterMergeAsync = filterMapAsyncBase(mergeMap);

export const filterSwitchAsync = filterMapAsyncBase(switchMap);
