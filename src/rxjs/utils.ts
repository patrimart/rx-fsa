import { Meta } from "../actions/interfaces";

export type MetaWithChain<M extends Record<string, any>> = M | { $$typeChain: string[] };

export const actionChainer = (type: string) => <M extends Meta>(meta: M): MetaWithChain<M> =>
  Object.assign({}, meta, { $$typeChain: [type].concat(Array.isArray(meta.$$typeChain) ? meta.$$typeChain : []) });
