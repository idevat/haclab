import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import { ConstraintValue } from "../common";
import {
  ConstraintResourceSetRscLinks,
  ConstraintRowWithResourceSet,
} from "../resourceSet";

export const ConstraintRowTicketSet = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintTicketSet;
}) => {
  return (
    <ConstraintRowWithResourceSet
      id={constraint.id}
      resourceSetList={constraint.sets}
      type="Ticket (set)"
      setCells={resourceSet => (
        <>
          <DataListCell width={4}>
            {"Resources "}
            <ConstraintResourceSetRscLinks resourceSet={resourceSet} />
            {" in role "}
            <strong>{resourceSet.role || "Started"}</strong>
            {" depends on ticket "}
            <strong>{constraint.ticket}</strong>
          </DataListCell>
        </>
      )}
      content={
        <ConstraintValue
          label="Loss policy"
          value={constraint["loss-policy"]}
        />
      }
    />
  );
};
