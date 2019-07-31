import React from "react";
import {
  DataListItem,
  DataListCell,
} from "@patternfly/react-core";

const ClusterStonith = ({ stonith: { id } }) => (
  <DataListItem aria-labelledby={id}>
    <DataListCell>
      {id}
    </DataListCell>
  </DataListItem>
);
export default ClusterStonith;
