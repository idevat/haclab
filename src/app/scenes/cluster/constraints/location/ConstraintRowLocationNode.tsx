import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import {
  ConstraintCell,
  ConstraintLink,
  ConstraintRow,
  ConstraintValue,
} from "../common";

import { ConstraintLocationDescRscPoint } from "./ConstraintLocationDescRscPoint";

export const ConstraintRowLocationNode = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintLocationNode;
}) => {
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location" width={1} />
          <DataListCell width={3}>
            <ConstraintLocationDescRscPoint constraint={constraint} />
            {" in role "}
            <strong>{constraint.role || "Started"}</strong>
            {" on node "}
            <ConstraintLink type="node" id={constraint.node} />
          </DataListCell>
          <ConstraintCell label="Score" value={constraint.score} width={1} />
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Resource discovery"
            value={constraint["resource-discovery"]}
          />
        </>
      }
    />
  );
};
