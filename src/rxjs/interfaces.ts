import { Action, Meta } from "../actions/interfaces";

export type ResponseFns<P, R, M extends Meta> = (params: P, resp: R, meta: M) => ReadonlyArray<Action<any, any>>;
