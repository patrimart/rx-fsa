import { Observable } from "rxjs/Observable";
import { filter, map } from "rxjs/operators";

import { MemoizedSelector, select, Store } from "@ngrx/store";

import { Action, ActionCreator, Meta } from "../actions/";

/**
 * Description
 */
export const lazySelectFactory = <S, R, V, P = any, M extends Meta = any>(
  selector: (v: V) => MemoizedSelector<S, R>,
  actions: (v: V) => Array<Action<P, M>>,
  predicate = (r: R | null | undefined) => !!r,
) => (store$: Store<S>) => (v: V) => (source: Observable<S>) =>
  source.pipe(
    select(selector(v)),
    map((result: R) => {
      if (!predicate(result)) {
        actions(v).forEach(a => store$.dispatch(a));
        return undefined;
      }
      return result;
    }),
    filter((obj: R | undefined): obj is R => obj !== undefined),
  );
