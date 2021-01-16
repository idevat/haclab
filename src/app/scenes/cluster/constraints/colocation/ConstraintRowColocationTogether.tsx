import React from "react";

import { types } from "app/store";

type Pair = types.cluster.ConstraintColocationPair;
type Set = types.cluster.ConstraintColocationSet;

const isTogether = (constraint: Pair | Set) =>
  constraint.score === "INFINITY"
  || (constraint.score
    && typeof constraint.score === "number"
    && constraint.score > 0);

export const ConstraintRowColocationTogether: React.FC<{
  constraint: Pair | Set;
}> = ({ constraint }) => {
  return <>{` are ${isTogether(constraint) ? "together" : "separate"}`}</>;
};
