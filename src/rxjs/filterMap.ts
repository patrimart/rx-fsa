import { from, Observable } from "rxjs";
import { catchError, concatMap, exhaustMap, filter, first, map, mergeMap, switchMap } from "rxjs/operators";

import { Action, ActionCreator, Meta } from "../actions/interfaces";
import { ResponseFns } from "./interfaces";

const filterMapBase = (mapper: typeof mergeMap) => <P, R, E, M extends Meta>(
  action: ActionCreator<P, M>,
  project: (params: P) => Observable<R>,
  failureFn: ResponseFns<P, E, M> = () => [],
  successFn: ResponseFns<P, R, M> = () => [],
) => (obs: Observable<Action<any, any>>) =>
  obs.pipe(
    filter(action.match),
    map(({ payload: params, meta }) => ({ params, meta })),
    mapper(({ params, meta }) =>
      project(params).pipe(
        first(),
        mergeMap((result: R) => from(successFn(params, result, meta))),
        catchError(error => from(failureFn(params, error, meta))),
      ),
    ),
  );

/**
 * Filters on the `started` Action of the AsyncActionCreator.
 * Invokes the srvFn (commonly a http request).
 * On success, returns the `done` Action with optional success Actions.
 * Else, returns the `failed` Action with optional failure Actions.
 */
export const filterConcat = filterMapBase(concatMap);

export const filterExhaust = filterMapBase(exhaustMap);

export const filterMerge = filterMapBase(mergeMap);

export const filterSwitch = filterMapBase(switchMap);
