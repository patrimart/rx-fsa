import "jest";

import { actionCreatorFactory, caseFn, casesFn, Re, reducerDefaultFn, reducerFn } from "../../src";

test("Reducers", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const incrementAction = fooActionFactory<{ increment: number }>("INCREMENT");
  const decrementAction = fooActionFactory<{ decrement: number }>("DECREMENT");

  const increment10Action = fooActionFactory<{ increment: 10 }>("INCREMENT10");
  const increment20Action = fooActionFactory<{ increment: 20 }>("INCREMENT20");

  interface State {
    value: number;
  }
  const INIT_STATE: State = { value: 10 };

  const incrementHandler: Re<State, { increment: number }> = (state, { increment }) => ({
    value: state.value + increment,
  });
  const decrementHandler: Re<State, { decrement: number }> = (state, { decrement }) => ({
    value: state.value - decrement,
  });

  const incReducer = reducerFn(caseFn(incrementAction, incrementHandler));
  const decReducer = reducerFn(caseFn(decrementAction, decrementHandler));
  const multiReducer = reducerFn(casesFn([increment10Action, increment20Action], incrementHandler));
  const reducers = reducerDefaultFn(INIT_STATE, incReducer, decReducer, multiReducer);

  const finalState = [
    incrementAction({ increment: 1 }),
    incrementAction({ increment: 2 }),
    decrementAction({ decrement: 3 }),
    increment10Action({ increment: 10 }),
    increment20Action({ increment: 20 }),
  ].reduce((state, action) => reducers(state, action), INIT_STATE);

  expect(finalState.value).toBe(40);
});
