export interface Meta {
  readonly $$typeChain: ReadonlyArray<string>;
}

export interface Action<P, M extends Meta> {
  readonly type: string;
  readonly payload: P;
  readonly meta: M;
  readonly error: boolean;
}

export interface Done<P, S> {
  readonly params: P;
  readonly result: S;
}

export interface Fail<P, E> {
  readonly params: P;
  readonly error: E;
}

export interface ActionCreator<P, M extends object> {
  <M2 extends object>(payload: P, meta?: M2): Action<P, M & M2 & Meta>;
  readonly type: string;
  readonly match: (action: Action<any, any>) => boolean;
}

export interface EmptyActionCreator<M extends object> extends ActionCreator<void, M> {
  <M2 extends object>(meta?: M): Action<void, M & M2 & Meta>;
}

export interface AsyncActionCreators<P, S, E, M extends object> {
  readonly type: string;
  readonly started: ActionCreator<P, M>;
  readonly done: ActionCreator<Done<P, S>, M>;
  readonly failed: ActionCreator<Fail<P, E>, M>;
}

export interface ActionCreatorFactory {
  <P = void, M extends object = Meta>(type: string, commonMeta?: M, error?: boolean): ActionCreator<P, M>;
  readonly async: <P, S, E, M extends object>(type: string, commonMeta?: M) => AsyncActionCreators<P, S, E, M>;
}
