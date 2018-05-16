import { combineLatest } from "rxjs/observable/combineLatest";

import { LazySelector } from "./createLazySelector";

export function composeLazySelector<S, R1, V1, R>(
  selector1: LazySelector<S, R1, V1>,
): (projector: (r1: NonNullable<R1>) => R) => LazySelector<S, R, V1>;

export function composeLazySelector<S, R1, V1, R2, V2, R>(
  selector1: LazySelector<S, R1, V1>,
  selector2: LazySelector<S, R2, V2>,
): (projector: (r1: NonNullable<R1>, r2: NonNullable<R2>) => R) => LazySelector<S, R, V1 & V2>;

export function composeLazySelector<S, R1, V1, R2, V2, R3, V3, R>(
  selector1: LazySelector<S, R1, V1>,
  selector2: LazySelector<S, R2, V2>,
  selector3: LazySelector<S, R3, V3>,
): (projector: (r1: NonNullable<R1>, r2: NonNullable<R2>, r3: NonNullable<R3>) => R) => LazySelector<S, R, V1 & V2>;

export function composeLazySelector<S, R1, V1, R2, V2, R3, V3, R4, V4, R>(
  selector1: LazySelector<S, R1, V1>,
  selector2: LazySelector<S, R2, V2>,
  selector3: LazySelector<S, R3, V3>,
  selector4: LazySelector<S, R4, V4>,
): (
  projector: (r1: NonNullable<R1>, r2: NonNullable<R2>, r3: NonNullable<R3>, r4: NonNullable<R4>) => R,
) => LazySelector<S, R, V1 & V2>;

export function composeLazySelector<S, R1, V1, R2, V2, R3, V3, R4, V4, R5, V5, R>(
  selector1: LazySelector<S, R1, V1>,
  selector2: LazySelector<S, R2, V2>,
  selector3: LazySelector<S, R3, V3>,
  selector4: LazySelector<S, R4, V4>,
  selector5: LazySelector<S, R5, V5>,
): (
  projector: (
    r1: NonNullable<R1>,
    r2: NonNullable<R2>,
    r3: NonNullable<R3>,
    r4: NonNullable<R4>,
    r5: NonNullable<R5>,
  ) => R,
) => LazySelector<S, R, V1 & V2 & V3 & V4 & V5>;

export function composeLazySelector<S, R1, R>(
  ...selectors: Array<LazySelector<S, R1, any>>
): (projector: (...values: Array<NonNullable<R1>>) => R) => LazySelector<S, R, any> {
  return projector => store$ => v => source =>
    combineLatest<any, NonNullable<R>>(selectors.map(selector => selector(store$)(v)(source)), projector);
}
