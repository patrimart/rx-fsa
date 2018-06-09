import "jest";

import { createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { actionCreatorFactory, composeLazySelector, createLazySelector } from "../../src";

interface AppState {
    feature: {
        counter?: number;
        n?: string;
    };
}

const counterActionFactory = actionCreatorFactory("COUNTER");
const resetCounterFactory = counterActionFactory("RESET");

const selectFeature = (state: AppState) => state.feature;
const selectFeatureCount = createSelector(selectFeature, state => state.counter);
const selectFeatureN = createSelector(selectFeature, state => state.n);

const lazySelectFeatureCount = createLazySelector(selectFeatureCount, resetCounterFactory);
const lazySelectFeatureN = createLazySelector(selectFeatureN, resetCounterFactory);
const lazySelectCountAndN =
    composeLazySelector(lazySelectFeatureCount, lazySelectFeatureN)((count, n) => `${n} = ${count}`);

class MyAppComponent {
  public count: Observable<number>;
  public countAndN: Observable<string>;

  constructor(private store$: Store<AppState>) {
    const selectCount = lazySelectFeatureCount(this.store$);
    this.count = this.store$.pipe(selectCount());
    const selectCountAndN = lazySelectCountAndN(this.store$);
    this.countAndN = this.store$.pipe(selectCountAndN());
  }
}

test("Thunk", () => {
  expect(true).toBeTruthy();
});
