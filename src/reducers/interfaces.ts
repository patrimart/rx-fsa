import { Action, ActionCreator, Meta } from "../actions";

export type Reducer<S, P, M extends Meta> = (state: S, action: Action<P, M>) => S;

/**
 * Interface for action handler.
 */
export type Handler<S, P> = (state: S, payload: P) => S;

/**
 * Variadic interface for casesFn.
 */
export interface CasesFn {
  <S, P1>(actionCreator: [ActionCreator<P1, any>], handler: Handler<S, P1>): Reducer<S, P1, any>;
  <S, P1, P2>(actionCreator: [ActionCreator<P1, any>, ActionCreator<P2, any>], handler: Handler<S, P1 | P2>): Reducer<
    S,
    P1 | P2,
    any
  >;
  <S, P1, P2, P3>(
    actionCreator: [ActionCreator<P1, any>, ActionCreator<P2, any>, ActionCreator<P3, any>],
    handler: Handler<S, P1 | P2 | P3>,
  ): Reducer<S, P1 | P2 | P3, any>;
  <S, P1, P2, P3, P4>(
    actionCreator: [ActionCreator<P1, any>, ActionCreator<P2, any>, ActionCreator<P3, any>, ActionCreator<P4, any>],
    handler: Handler<S, P1 | P2 | P3 | P4>,
  ): Reducer<S, P1 | P2 | P3 | P4, any>;
  <S, P1, P2, P3, P4, P5>(
    actionCreator: [
      ActionCreator<P1, any>,
      ActionCreator<P2, any>,
      ActionCreator<P3, any>,
      ActionCreator<P4, any>,
      ActionCreator<P5, any>
    ],
    handler: Handler<S, P1 | P2 | P3 | P4 | P5>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5, any>;
  <S, P1, P2, P3, P4, P5, P6>(
    actionCreator: [
      ActionCreator<P1, any>,
      ActionCreator<P2, any>,
      ActionCreator<P3, any>,
      ActionCreator<P4, any>,
      ActionCreator<P5, any>,
      ActionCreator<P5, any>
    ],
    handler: Handler<S, P1 | P2 | P3 | P4 | P5 | P6>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6, any>;
}

/**
 * Variadic interface for reduceFn.
 */
export interface ReducerFn {
  <S>(): Reducer<S, void, any>;
  <S, P1>(c1: Reducer<S, P1, any>): Reducer<S, P1, any>;
  <S, P1, P2>(c1: Reducer<S, P1, any>, c2: Reducer<S, P2, any>): Reducer<S, P1 | P2, any>;
  <S, P1, P2, P3>(c1: Reducer<S, P1, any>, c2: Reducer<S, P2, any>, c3: Reducer<S, P3, any>): Reducer<
    S,
    P1 | P2 | P3,
    any
  >;
  <S, P1, P2, P3, P4>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
  ): Reducer<S, P1 | P2 | P3 | P4, any>;
  <S, P1, P2, P3, P4, P5>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5, any>;
  <S, P1, P2, P3, P4, P5, P6>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6, any>;
  <S, P1, P2, P3, P4, P5, P6, P7>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7, any>;
  <S, P1, P2, P3, P4, P5, P6, P7, P8>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8, any>;
  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
    c15: Reducer<S, P15, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14 | P15, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
    c15: Reducer<S, P15, any>,
    c16: Reducer<S, P16, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14 | P15 | P16, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
    c15: Reducer<S, P15, any>,
    c16: Reducer<S, P16, any>,
    c17: Reducer<S, P17, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14 | P15 | P16 | P17, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17, P18>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
    c15: Reducer<S, P15, any>,
    c16: Reducer<S, P16, any>,
    c17: Reducer<S, P17, any>,
    c18: Reducer<S, P18, any>,
  ): Reducer<S, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18, any>;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
    c15: Reducer<S, P15, any>,
    c16: Reducer<S, P16, any>,
    c17: Reducer<S, P17, any>,
    c18: Reducer<S, P18, any>,
    c19: Reducer<S, P19, any>,
  ): Reducer<
    S,
    P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19,
    any
  >;

  <S, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20>(
    c1: Reducer<S, P1, any>,
    c2: Reducer<S, P2, any>,
    c3: Reducer<S, P3, any>,
    c4: Reducer<S, P4, any>,
    c5: Reducer<S, P5, any>,
    c6: Reducer<S, P6, any>,
    c7: Reducer<S, P7, any>,
    c8: Reducer<S, P8, any>,
    c9: Reducer<S, P9, any>,
    c10: Reducer<S, P10, any>,
    c11: Reducer<S, P11, any>,
    c12: Reducer<S, P12, any>,
    c13: Reducer<S, P13, any>,
    c14: Reducer<S, P14, any>,
    c15: Reducer<S, P15, any>,
    c16: Reducer<S, P16, any>,
    c17: Reducer<S, P17, any>,
    c18: Reducer<S, P18, any>,
    c19: Reducer<S, P19, any>,
    c20: Reducer<S, P20, any>,
  ): Reducer<
    S,
    P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 | P14 | P15 | P16 | P17 | P18 | P19 | P20,
    any
  >;
}
