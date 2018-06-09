import { from, Observable } from "rxjs";
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, switchMap } from "rxjs/operators";

import { Action, AsyncActionCreators, Done, Fail, Meta } from "../actions/interfaces";
import { ResponseFns } from "./interfaces";

const filterMapAsyncBase = (mapper: typeof mergeMap) => <P, R, E, M extends Meta>(
  action: AsyncActionCreators<P, R, E, M>,
  project: (params: P) => Observable<R>,
  failureFn: ResponseFns<P, E, M> = () => [],
  successFn: ResponseFns<P, R, M> = () => [],
) => (obs: Observable<Action<any, any>>) => obs.pipe(
    filter(action.started.match),
    map(({ payload: params, meta }) => ({ params, meta })),
    mapper(({ params, meta }) =>
      project(params).pipe(
        mergeMap((result: R) =>
          from(
            [action.done({ params, result }, meta) as Action<Done<P, R>, M & {}>].concat(
              successFn(params, result, meta),
            ),
          ),
        ),
        catchError(error =>
          from(
            [action.failed({ params, error }, meta) as Action<Fail<P, E>, M & {}>].concat(
              failureFn(params, error, meta),
            ),
          ),
        ),
      ),
    ),
  );

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
