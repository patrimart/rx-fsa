import { Meta } from "../actions/interfaces";

export const actionChainer = (type: string) => <M extends Meta>(meta: M): M => ({
  ...(meta as any),
  $$typeChain: [...(meta.$$typeChain || []), type],
});
