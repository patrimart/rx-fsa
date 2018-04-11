export interface Action<P = any, M = void> {
  type: string;
  payload: P;
  meta: M;
  error?: true;
}

export interface Success<P, S> {
  params: P;
  result: S;
}

export interface Failure<P, E> {
  params: P;
  error: E;
}

export interface ActionCreator<P> {
  type: string;
  match: (action: Action) => action is Action<P>;
  <M = void>(payload: P, meta: M): Action<P, M>;
}

export interface EmptyActionCreator extends ActionCreator<void> {
  <M = void>(payload?: void, meta?: M): Action<undefined, M>;
}

export interface AsyncActionCreators<P, S, E> {
  type: string;
  started: ActionCreator<P>;
  done: ActionCreator<Success<P, S>>;
  failed: ActionCreator<Failure<P, E>>;
}

export interface ActionCreatorFactory<M> {
  (type: string, commonMeta?: M, error?: boolean): EmptyActionCreator;
  <P>(type: string, commonMeta?: M, isError?: boolean | ((payload: P) => boolean)): ActionCreator<P>;

  async<P, S>(type: string, commonMeta?: M): AsyncActionCreators<P, S, any>;
  async<P, S, E>(type: string, commonMeta?: M): AsyncActionCreators<P, S, E>;
}
