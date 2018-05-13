import { Observable } from "rxjs/Observable";
import { filter, map } from "rxjs/operators";

import { MemoizedSelector, select, Store } from "@ngrx/store";

import { Action, Meta } from "../actions/interfaces";

/**
 * Builds a MemoizedSelector that, if the predicate fails, will dispatch action(s)
 * to ultimately satisfy the predicate and emit a value.
 */
export function lazySelectFactory<S, R, P = any, M extends Meta = any>(
  selector: MemoizedSelector<S, R>,
  action: Action<P, M>,
  predicate?: (r: R | null | undefined) => boolean,
): (store$: Store<S>) => () => (source: Observable<S>) => Observable<R>;

export function lazySelectFactory<S, R, P = any, M extends Meta = any>(
  selector: () => MemoizedSelector<S, R>,
  actions: () => Array<Action<P, M>>,
  predicate?: (r: R | null | undefined) => boolean,
): (store$: Store<S>) => () => (source: Observable<S>) => Observable<R>;

export function lazySelectFactory<S, R, V, P = any, M extends Meta = any>(
  selector: (() => MemoizedSelector<S, R>) | ((v: V) => MemoizedSelector<S, R>),
  actions: (() => Array<Action<P, M>>) | ((v: V) => Array<Action<P, M>>),
  predicate?: (r: R | null | undefined) => boolean,
): (store$: Store<S>) => (v: V) => (source: Observable<S>) => Observable<R>;

export function lazySelectFactory<S, R, V, P = any, M extends Meta = any>(
  selector: ((v?: V) => MemoizedSelector<S, R>) | MemoizedSelector<S, R>,
  actions: ((v?: V) => Array<Action<P, M>>) | Action<P, M>,
  predicate = (r: R | null | undefined) => !!r,
) {
  const selectorFn = "projector" in selector ? () => selector : selector;
  const actionsFn = typeof actions === "function" ? actions : () => [actions];
  return (store$: Store<S>) => (v?: V) => (source: Observable<S>) =>
    source.pipe(
      select(selectorFn(v)),
      map((result: R) => {
        if (!predicate(result)) {
          actionsFn(v).forEach(a => store$.dispatch(a));
          return undefined;
        }
        return result;
      }),
      filter((obj: R | undefined): obj is R => obj !== undefined),
    );
}
