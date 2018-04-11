import { Action, ActionCreator } from "../actions";

export type Reducer<S, P> = (state: S, action: Action<P>) => S;

/**
 * Interface for action handler.
 */
export type Handler<S, P> = (state: S, payload: P) => S;

/**
 * Variadic interface for casesFn.
 */
export interface CasesFn {
    <S, P1>(
        actionCreator: [ActionCreator<P1>],
        handler: Handler<S, P1>,
    ): Reducer<S, P1>;
    <S, P1, P2>(
        actionCreator: [ActionCreator<P1>, ActionCreator<P2>],
        handler: Handler<S, P1 | P2>,
    ): Reducer<S, P1 | P2>;
    <S, P1, P2, P3>(
        actionCreator: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>
        ],
        handler: Handler<S, P1 | P2 | P3>,
    ): Reducer<S, P1 | P2 | P3>;
    <S, P1, P2, P3, P4>(
        actionCreator: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>,
            ActionCreator<P4>
        ],
        handler: Handler<S, P1 | P2 | P3 | P4>,
    ): Reducer<S, P1 | P2 | P3 | P4>;
    <S, P1, P2, P3, P4, P5>(
        actionCreator: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>,
            ActionCreator<P4>,
            ActionCreator<P5>
        ],
        handler: Handler<S, P1 | P2 | P3 | P4 | P5>,
    ): Reducer<S, P1 | P2 | P3 | P4 | P5>;
}

/**
 * Variadic interface for reduceFn.
 */
export interface ReducerFn {
    <S>(): Reducer<S, void>;
    <S, P1>(c1: Reducer<S, P1>): Reducer<S, P1>;
    <S, P1, P2>(c1: Reducer<S, P1>, c2: Reducer<S, P2>): Reducer<S, P1 | P2>;
    <S, P1, P2, P3>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
    ): Reducer<S, P1 | P2 | P3>;
    <S, P1, P2, P3, P4>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
    ): Reducer<S, P1 | P2 | P3 | P4>;
    <S, P1, P2, P3, P4, P5>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
    ): Reducer<S, P1 | P2 | P3 | P4 | P5>;
    <S, P1, P2, P3, P4, P5, P6>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
    ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6>;
    <S, P1, P2, P3, P4, P5, P6, P7>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
        c7: Reducer<S, P7>,
    ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7>;
    <S, P1, P2, P3, P4, P5, P6, P7, P8>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
        c7: Reducer<S, P7>,
        c8: Reducer<S, P8>,
    ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8>;
    <S, P1, P2, P3, P4, P5, P6, P7, P8, P9>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
        c7: Reducer<S, P7>,
        c8: Reducer<S, P8>,
        c9: Reducer<S, P9>,
    ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9>;
}

/**
 * Variadic interface for reducerDefaultFn.
 */
export interface ReducerDefaultFn {
    <S>(): (initialState: S) => Reducer<S, void>;
    <S, P1>(c1: Reducer<S, P1>): (initialState: S) => Reducer<S, P1>;
    <S, P1, P2>(c1: Reducer<S, P1>, c2: Reducer<S, P2>): (
        initialState: S,
    ) => Reducer<S, P1 | P2>;
    <S, P1, P2, P3>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
    ): (initialState: S) => Reducer<S, P1 | P2 | P3>;
    <S, P1, P2, P3, P4>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
    ): (initialState: S) => Reducer<S, P1 | P2 | P3 | P4>;
    <S, P1, P2, P3, P4, P5>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
    ): (initialState: S) => Reducer<S, P1 | P2 | P3 | P4 | P5>;
    <S, P1, P2, P3, P4, P5, P6>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
    ): (initialState: S) => Reducer<S, P1 | P2 | P3 | P4 | P5 | P6>;
    <S, P1, P2, P3, P4, P5, P6, P7>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
        c7: Reducer<S, P7>,
    ): (initialState: S) => Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7>;
    <S, P1, P2, P3, P4, P5, P6, P7, P8>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
        c7: Reducer<S, P7>,
        c8: Reducer<S, P8>,
    ): (initialState: S) => Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8>;
    <S, P1, P2, P3, P4, P5, P6, P7, P8, P9>(
        c1: Reducer<S, P1>,
        c2: Reducer<S, P2>,
        c3: Reducer<S, P3>,
        c4: Reducer<S, P4>,
        c5: Reducer<S, P5>,
        c6: Reducer<S, P6>,
        c7: Reducer<S, P7>,
        c8: Reducer<S, P8>,
        c9: Reducer<S, P9>,
    ): (
        initialState: S,
    ) => Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9>;
}
