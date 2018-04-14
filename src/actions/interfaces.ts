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

export interface EmptyActionCreator<M extends Meta> extends ActionCreator<void, M> {
  <M2 extends Meta>(meta: M): Action<void, M & M2>;
}

export interface AsyncActionCreators<P, S, E, M extends Meta> {
  readonly type: string;
  readonly started: ActionCreator<P, M>;
  readonly done: ActionCreator<Done<P, S>, M>;
  readonly failed: ActionCreator<Fail<P, E>, M>;
}

export interface ActionCreator<P, M extends Meta> {
  <M2 extends Meta>(payload: P, meta: M2): Action<P, M & M2>;
  readonly type: string;
  readonly match: (action: Action<any, any>) => boolean;
}

export interface ActionCreatorFactory {
  <P, M extends Meta>(type: string, commonMeta: M, error: boolean): ActionCreator<P, M>;
  readonly async: <P, S, E, M extends Meta>(type: string, commonMeta: M) => AsyncActionCreators<P, S, E, M>;
}
