import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import {
  ConstraintCell,
  ConstraintCellFake,
  ConstraintLink,
  ConstraintResourceInRole,
  ConstraintRow,
  ConstraintValue,
} from "../common";

export const ConstraintRowTicketResource = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintTicketResource;
}) => {
  return (
    <ConstraintRow
      aria-labelledby={`Ticket constraint ${constraint.id}`}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Ticket" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <ConstraintLink type="resource" id={constraint.rsc} />
            <ConstraintResourceInRole role={constraint["rsc-role"]} />
            {" depends on ticket "}
            <strong>{constraint.ticket}</strong>
          </DataListCell>
          <ConstraintCellFake />
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Loss policy"
            value={constraint["loss-policy"]}
          />
        </>
      }
    />
  );
};
