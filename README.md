# FSA Reducers and RxJS Utils

This TypeScript library provides:

- Factories for creating fully-typed FSA-compliant Actions.
- Composable reducers and Action filters.
- RxJS operators for easier async Effects set-up.

```ts
export interface Action<P, M extends Meta> {
  readonly type: string;
  readonly payload: P;
  readonly meta: M;
  readonly error: boolean;
}
```

# Installation

```
npm i -S rx-fsa
```

# Usage

## Basic Empty and Syncronous Actions

```ts
import { actionCreatorFactory } from "rx-fsa/actions";

const counterActionFactory = actionCreatorFactory("COUNTER");
const resetCounterFactory = counterActionFactory("RESET");
const resetActionAction = resetCounterFactory(undefined);

const incrementCounterFactory = counterActionFactory<number>("INCREMENT");
const incrementOneAction = incrementCounterFactory(1);

const decrementCounterFactory = counterActionFactory<number>("INCREMENT");
const decrementAction = (count: number) => decrementCounterFactory(count);
```

## Async Action Creators

```ts
const saveCountFactory = counterActionFactory.async<{ count: 100 }, void, Error>("SAVE");
const saveCountStartedAction = saveCountFactory.started({ count: 100 });
const saveCountDoneAction = saveCountFactory.done({ result: 100, params: { count: 100 } });
const saveCountFailedAction = saveCountFactory.failed({ error: new Error("File not saved."), params: { count: 100 } });
```

---

## Reducers

```ts
import { caseFn, Re, reducerDefaultFn } from "rx-fsa/reducers";

interface State {
  value: number;
}
const INIT_STATE: State = { value: 0 };

const resetHandler: Re<State, void> = state => INIT_STATE;

const incrementHandler: Re<State, number> = (state, add) => ({
  value: state.value + add,
});

const decrementHandler: Re<State, number> = (state, sub) => ({
  value: state.value - sub,
});

export const reducers = reducerDefaultFn(INIT_STATE)(
  caseFn(incrementCounterFactory, incrementHandler),
  caseFn(decrementCounterFactory, decrementHandler),
  caseFn(resetCounterFactory, resetHandler),
);
```

---

## RxJS Operators

The following operators are provided under `rx-fsa/rxjs`:
- filterConcatAsync
- filterExhaustAsync
- filterMergeAsync
- filterSwitchAsync
- filterConcat
- filterExhaust
- filterMerge
- filterSwitch
- filterActions

Example with NgRx Effects:
```ts
import { filterExhaustAsync } from "rx-fsa/rxjs";

@Effect()
public saveCount$ = this.action$.pipe(
    filterExhaustAsync(saveCountFactory, params => this.httpSvc.save(params)),
);
```
The above is equivalent to:
```ts
@Effect()
public saveCount$ = this.action$.pipe(
  filter(saveCountFactory.started.match),
  mergeMap((result: R) => this.httpSvc.save(params).pipe(
    map(result = saveCountFactory.done({ result, params })),
    catchError(error => saveCountFactory.failed({ error, params }),
  ),
);
```

---

## Lazy Selector

Create a `MemoizedSelector` that will emit a store slice or, if unavailable, dispatch action(s) to set the store slice and then emit.

```ts
// selectors.ts
import { createSelector } from "@ngrx/store";
import { lazySelectorFactory } from "rx-fsa/ngrx";

export const selectFeature = (state: AppState) => state.feature;
export const selectFeatureCount = createSelector(selectFeature, state => state.counter);

export const lazySelectFeatureCount = lazySelectorFactory(selectFeatureCount, loadFeatureAction);
```

```ts
// app.component.ts
import { lazySelectFeatureCount } from './selectors';

@Component({ ... })
class MyAppComponent {
  counter: Observable<number>;

  constructor(private store: Store<AppState>) {
    const selectFeatureCount = lazySelectFeatureCount(store);
    this.counter = store.pipe(select(selectFeatureCount()));
  }
}
```

# API

API Documentation is coming soon. The library is small to scour through in GitHub to learn more.

# Credits

This library was inspired by:
- https://github.com/aikoven/typescript-fsa
- https://github.com/dphilipson/typescript-fsa-reducers
