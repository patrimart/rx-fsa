import { Observable } from "rxjs/Observable";
import { from } from "rxjs/observable/from";
import { catchError, concatMap, exhaustMap, filter, mergeMap, switchMap } from "rxjs/operators";

import { Action, ActionCreator } from "../actions";

import { ResponseFns } from "./filterMapAsync";

const filterMapBase = (mapper: typeof mergeMap) => <P, R, E, M>(
  action: ActionCreator<P, M>,
  svcFn: (params: P) => Observable<R>,
  failureFn: ResponseFns<P, E> = () => [],
  successFn: ResponseFns<P, R> = () => [],
) => (obs: Observable<Action<any>>) =>
  obs.pipe(
    filter(action.match),
    mapper(({ payload: params, meta }) =>
      svcFn(params).pipe(
        mergeMap((result: R) => from(successFn(params, result, meta))),
        catchError(error => from(failureFn(params, error, meta))),
      ),
    ),
  );

export const filterConcat = filterMapBase(concatMap);

export const filterExhaust = filterMapBase(exhaustMap);

export const filterMerge = filterMapBase(mergeMap);

export const filterSwitch = filterMapBase(switchMap);
