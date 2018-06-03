import { UnaryFunction } from "rxjs/interfaces";
import { Observable } from "rxjs/Observable";
import { filter, map } from "rxjs/operators";

import { Action as BaseAction, MemoizedSelector, select, Store } from "@ngrx/store";

// import { Action } from "../actions/";

export type LazySelector<S, R, V> = (
  store$: Store<S>,
) => (v?: V) => UnaryFunction<Observable<S>, Observable<NonNullable<R>>>;

// export type SelectorProd<S, R, V> =
//   | MemoizedSelector<S, R | undefined>
//   | (() => MemoizedSelector<S, R | undefined>)
//   | ((v: V) => MemoizedSelector<S, R | undefined>);

// export type ActionProd<V> = BaseAction | (() => BaseAction[]) | ((v: V) => BaseAction[]);

/**
 * Builds a MemoizedSelector that, if the predicate fails, will dispatch action(s)
 * to ultimately satisfy the predicate and emit a value.
 */

export function createLazySelector<S, R>(
  selector: MemoizedSelector<S, R>,
  action: BaseAction,
  predicate?: (r: R | null | undefined) => boolean,
): LazySelector<S, R, void>;

export function createLazySelector<S, R>(
  selector: () => MemoizedSelector<S, R>,
  actions: () => BaseAction[],
  predicate?: (r: R | null | undefined) => boolean,
): LazySelector<S, R, void>;

export function createLazySelector<S, R, V>(
  selector: (() => MemoizedSelector<S, R>) | ((v: V) => MemoizedSelector<S, R>),
  actions: (() => BaseAction[]) | ((v: V) => BaseAction[]),
  predicate?: (r: R | null | undefined) => boolean,
): LazySelector<S, R, V>;

export function createLazySelector<S, R, V>(
  selector: ((v?: V) => MemoizedSelector<S, R>) | MemoizedSelector<S, R>,
  actions: ((v?: V) => BaseAction[]) | BaseAction,
  predicate = (r: R | null | undefined) => r !== null && r !== undefined,
): LazySelector<S, R, V> {
  const selectorFn = "projector" in selector ? () => selector : selector;
  const actionsFn = typeof actions === "function" ? actions : (_?: V) => [actions];
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
      filter((obj: R | undefined): obj is NonNullable<R> => obj !== undefined),
    );
}
