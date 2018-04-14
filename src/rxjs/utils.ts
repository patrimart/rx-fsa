import { Meta } from "../actions/interfaces";

export const actionChainer = (type: string) => <M extends Meta>(meta: M): M =>
  Object.assign({}, meta, { $$typeChain: [...meta.$$typeChain, type] });
