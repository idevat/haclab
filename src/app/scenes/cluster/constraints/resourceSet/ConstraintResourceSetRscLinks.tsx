import React from "react";

import { types } from "app/store";

import { ConstraintLink } from "../common";

export const ConstraintResourceSetRscLinks: React.FC<{
  resourceSet: types.cluster.ConstraintResourceSetStructured;
}> = ({ resourceSet }) => {
  return (
    <>
      {resourceSet.resources
        .map<React.ReactNode>(resourceId => (
          <ConstraintLink key={resourceId} type="resource" id={resourceId} />
        ))
        .reduce((prev, curr) => [prev, " ", curr])}
    </>
  );
};
