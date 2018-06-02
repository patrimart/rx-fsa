/**
 * Interface for metadata.
 */
export type Meta = Readonly<object> &  { readonly [key: string]: any };

/**
 * Interface for FSA Action.
 */
export interface Action<P, M extends Meta = Meta> {
  readonly type: string;
  readonly payload: P;
  readonly meta: M;
  readonly error: boolean;
}

/**
 * Interface for "Done" Action payload.
 */
export interface Done<P, S> {
  readonly params: P;
  readonly result: S;
}

/**
 * Interface for "Fail" Action payload.
 */
export interface Fail<P, E> {
  readonly params: P;
  readonly error: E;
}

/**
 * Interface for creating syncrconous actions.
 */
export interface ActionCreator<P, M extends Meta = Meta> {
  <M2 extends Meta = Meta>(payload: P, meta?: M2): Action<P, M & M2>;
  readonly type: string;
  readonly match: (action: Action<any, any>) => action is Action<P, M>;
}

// export interface EmptyActionCreator<M extends object> extends ActionCreator<void, M> {
//   <M2 extends object>(payload: void, meta?: M): Action<void, M & M2 & Meta>;
// }

/**
 * Interface for creating async actions.
 */
export interface AsyncActionCreators<P, S, E, M extends Meta = Meta> {
  readonly type: string;
  readonly started: ActionCreator<P, M>;
  readonly done: ActionCreator<Done<P, S>, M>;
  readonly failed: ActionCreator<Fail<P, E>, M>;
}

/**
 * Interface for the action creator factory.
 */
export interface ActionCreatorFactory {
  <P = void, M extends Meta = Meta>(type: string, commonMeta?: M, error?: boolean): ActionCreator<P, M>;
  readonly async: <P, S, E, M extends Meta = Meta>(type: string, commonMeta?: M) => AsyncActionCreators<P, S, E, M>;
}
