import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, switchMap } from "rxjs/operators";

import { Action, ActionCreator, Meta } from "../actions/interfaces";
import { ResponseFns } from "./interfaces";
import { actionChainer } from "./utils";

const filterMapBase = (mapper: typeof mergeMap) => <P, R, E, M extends Meta>(
  action: ActionCreator<P, M>,
  project: (params: P) => Observable<R>,
  failureFn: ResponseFns<P, E, M> = () => [],
  successFn: ResponseFns<P, R, M> = () => [],
) => (obs: Observable<Action<any, any>>) => {
  const ac = actionChainer(action.type);
  return obs.pipe(
    filter(action.match),
    map(({ payload: params, meta }) => ({ params, meta: ac(meta) })),
    mapper(({ params, meta }) =>
      project(params).pipe(
        mergeMap((result: R) => from(successFn(params, result, meta))),
        catchError(error => from(failureFn(params, error, meta))),
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
export const filterConcat = filterMapBase(concatMap);

export const filterExhaust = filterMapBase(exhaustMap);

export const filterMerge = filterMapBase(mergeMap);

export const filterSwitch = filterMapBase(switchMap);
