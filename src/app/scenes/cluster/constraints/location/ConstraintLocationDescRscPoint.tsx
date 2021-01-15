import React from "react";

import { types } from "app/store";

import { ConstraintLink } from "../common";

export const ConstraintLocationDescRscPoint: React.FC<{
  constraint:
    | types.cluster.ConstraintLocationRule
    | types.cluster.ConstraintLocationNode;
}> = ({ constraint }) => {
  if ("rsc" in constraint) {
    return (
      <>
        {"Resource "}
        <ConstraintLink type="resource" id={constraint.rsc} />
      </>
    );
  }
  return (
    <>
      {"Resources matching "}
      <strong>{constraint["rsc-pattern"]}</strong>
    </>
  );
};
