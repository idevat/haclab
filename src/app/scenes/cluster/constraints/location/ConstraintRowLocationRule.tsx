import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import {
  ConstraintCell,
  ConstraintCellFake,
  ConstraintResourceInRole,
  ConstraintRow,
  ConstraintValue,
} from "../common";

import { ConstraintLocationDescRscPoint } from "./ConstraintLocationDescRscPoint";
import { ConstraintLocationCellScore } from "./ConstraintLocationCellScore";

export const ConstraintRowLocationRule = ({
  id,
  constraint,
}: {
  id: string;
  constraint: types.cluster.ConstraintLocationRule;
}) => {
  return (
    <ConstraintRow
      id={id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Location (rule)" width={1} />
          {"id-ref" in constraint && (
            <>
              <DataListCell width={3}>
                <ConstraintLocationDescRscPoint constraint={constraint} />
                {" according to the rule with id "}
                <strong>{constraint["id-ref"]}</strong>
              </DataListCell>
              <ConstraintCellFake />
            </>
          )}
          {!("id-ref" in constraint) && (
            <>
              <DataListCell width={3}>
                <ConstraintLocationDescRscPoint constraint={constraint} />
                <ConstraintResourceInRole role={constraint.role} />
                {" according to the rule "}
                <strong>{constraint.rule_string}</strong>
              </DataListCell>
              <ConstraintLocationCellScore constraint={constraint} />
            </>
          )}
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
