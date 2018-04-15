import { Meta } from "../actions/interfaces";

/**
 * Helper function to track Action chain in the metadata's $$typeChain array.
 */
export const actionChainer = (type: string) => <M extends Meta>(meta: M): M => ({
  ...(meta as any),
  $$typeChain: [...(meta.$$typeChain || []), type],
});
