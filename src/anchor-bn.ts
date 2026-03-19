import * as anchorModule from "@coral-xyz/anchor";

type AnchorNamespace = typeof import("@coral-xyz/anchor");
type AnchorNamespaceWithDefault = AnchorNamespace & {
  default?: AnchorNamespace;
};

const anchor = anchorModule as AnchorNamespaceWithDefault;
const resolvedBN = anchor.BN ?? anchor.default?.BN;

if (!resolvedBN) {
  throw new Error("Unable to resolve Anchor BN constructor at runtime.");
}

export const AnchorBN: AnchorNamespace["BN"] = resolvedBN;
