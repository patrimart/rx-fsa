import { Observable, UnaryFunction } from "rxjs";
import { filter, map } from "rxjs/operators";

import { Action as BaseAction, MemoizedSelector, select, Store } from "@ngrx/store";

export type LazySelector<S, R, V> = (
  store$: Store<S>,
) => (v?: V) => UnaryFunction<Observable<S>, Observable<R>>;

export function createLazySelector<S, R>(
  selector: MemoizedSelector<S, R | undefined>,
  action: BaseAction,
  predicate?: (r: R | undefined) => boolean,
): LazySelector<S, R, void>;

export function createLazySelector<S, R>(
  selector: () => MemoizedSelector<S, R | undefined>,
  actions: () => BaseAction[],
  predicate?: (r: R | undefined) => boolean,
): LazySelector<S, R, void>;

export function createLazySelector<S, R, V>(
  selector: (() => MemoizedSelector<S, R | undefined>) | ((v: V) => MemoizedSelector<S, R | undefined>),
  actions: (() => BaseAction[]) | ((v: V) => BaseAction[]),
  predicate?: (r: R | undefined) => boolean,
): LazySelector<S, R, V>;

export function createLazySelector<S, R, V>(
  selector: ((v?: V) => MemoizedSelector<S, R | undefined>) | MemoizedSelector<S, R | undefined>,
  actions: ((v?: V) => BaseAction[]) | BaseAction,
  predicate = (r: R | undefined) => r !== undefined,
): LazySelector<S, R, V> {
  const selectorFn = "projector" in selector ? () => selector : selector;
  const actionsFn = typeof actions === "function" ? actions : (_?: V) => [actions];
  return (store$: Store<S>) => (v?: V) => (source: Observable<S>) =>
    source.pipe(
      select(selectorFn(v)),
      map((result: R | undefined) => {
        if (!predicate(result)) {
          actionsFn(v).forEach(a => store$.dispatch(a));
          return undefined;
        }
        return result;
      }),
      filter((obj: R | undefined): obj is R => obj !== undefined),
    );
}
