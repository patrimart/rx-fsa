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


## Installation

```
npm i -S rx-fsa
```

## Usage

### Basic Empty and Syncronous Actions

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

### Async Action Creators

```ts
const saveCountFactory = counterActionFactory.async<{ count: 100 }, void, Error>("SAVE");
const saveCountStarted = saveCountFactory.started({ count: 100 });
const saveCountDone = saveCountFactory.done({ result: 100, params: { count: 100 } });
const saveCountFailed = saveCountFactory.failed({ error: new Error("File not saved."), params: { count: 100 } });
```

### Reducers

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

### RxJS Operators

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
    filterExhaustAsync(saveCountFactory, params => this.backend.save(params)),
);
```
The above is equivalent to:
```ts
@Effect()
public saveCount$ = this.action$.pipe(
  filter(saveCountFactory.started.match),
  mergeMap((result: R) => this.backend.save(params).pipe(
    map(result = saveCountFactory.done({ result, params })),
    catchError(error => saveCountFactory.failed({ error, params }),
  ),
);
```

## API

API Documentation is coming soon. The library is small to scour through in GitHub to learn more.

## Credits

This library was inspired by:
- https://github.com/aikoven/typescript-fsa
- https://github.com/dphilipson/typescript-fsa-reducers
