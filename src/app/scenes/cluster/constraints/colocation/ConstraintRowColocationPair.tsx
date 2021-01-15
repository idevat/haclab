import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import {
  ConstraintCell,
  ConstraintLink,
  ConstraintRow,
  ConstraintValue,
} from "../common";

export const ConstraintRowColocationPair = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintColocationPair;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Colocation" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <ConstraintLink type="resource" id={constraint.rsc} />
            {" in role "}
            <strong>{constraint["rsc-role"] || "Started"}</strong>
            {constraint.score === "INFINITY"
            || (constraint.score
              && typeof constraint.score === "number"
              && constraint.score > 0)
              ? " together with "
              : " apart from "}
            {" resource "}
            <ConstraintLink type="resource" id={constraint["with-rsc"]} />
            {" in role "}
            <strong>{constraint["with-rsc-role"] || "Started"}</strong>
          </DataListCell>

          <ConstraintCell label="Score" value={constraint.score} width={1} />
        </>
      }
      content={
        <ConstraintValue
          label="Node attribute"
          value={constraint["node-attribute"]}
        />
      }
    />
  );
};
