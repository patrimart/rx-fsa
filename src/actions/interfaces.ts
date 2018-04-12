export interface Action<P = any, M = any> {
  readonly type: string;
  readonly payload: P;
  readonly meta?: M;
  readonly error?: true;
}

export interface Done<P, S> {
  readonly params: P;
  readonly result: S;
}

export interface Fail<P, E> {
  readonly params: P;
  readonly error: E;
}

export interface EmptyActionCreator<M> extends ActionCreator<void, M> {
  <M2>(meta?: M): Action<void, M & M2>;
}

export interface AsyncActionCreators<P, S, E, M> {
  readonly type: string;
  readonly started: ActionCreator<P, M>;
  readonly done: ActionCreator<Done<P, S>, M>;
  readonly failed: ActionCreator<Fail<P, E>, M>;
}

export interface ActionCreator<P, M> {
  <M2>(payload: P, meta?: M2): Action<P, M & M2>;
  readonly type: string;
  readonly match: <M2>(action: Action) => action is Action<P, M & M2>;
}

export interface ActionCreatorFactory {
  <M, M2>(type: string, commonMeta?: M, error?: true): EmptyActionCreator<M>;
  <P, M>(type: string, commonMeta?: M, error?: true): ActionCreator<P, M>;
  readonly async: <P, S, E, M>(type: string, commonMeta?: M) => AsyncActionCreators<P, S, E, M>;
}
