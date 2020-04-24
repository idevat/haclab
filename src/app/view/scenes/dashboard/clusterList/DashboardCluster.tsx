import React from "react";

import { types } from "app/store";
import { IssueList, Table } from "app/view/common";

import { DashboardClusterNodes } from "./DashboardClusterNodes";
import { DashboardClusterResources } from "./DashboardClusterResources";
import { DashboardClusterFenceDevices } from "./DashboardClusterFenceDevices";
import { DashboardClusterCellName } from "./DashboardClusterCellName";
import { DashboardClusterCellSummary } from "./DashboardClusterCellSummary";

const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

export const DashboardCluster = ({
  cluster,
}: {
  cluster: types.cluster.ClusterState;
}) => {
  const { expanded, Toggle, Content } = Table.Expansion.useExpansion({
    contentSpan: CELL_COUNT,
  });

  return (
    <Table.Body
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      data-test={`cluster ${cluster.name}`}
    >
      <tr role="row">
        <DashboardClusterCellName clusterUrlName={cluster.urlName} />
        <Toggle expandKey={COLUMNS.ISSUES} data-test="issues">
          <DashboardClusterCellSummary
            itemsCount={cluster.issueList.length}
            summaryStatus={cluster.summary.issuesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.NODES} data-test="nodes">
          <DashboardClusterCellSummary
            itemsCount={cluster.nodeList.length}
            summaryStatus={cluster.summary.nodesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.RESOURCES} data-test="resources">
          <DashboardClusterCellSummary
            itemsCount={cluster.resourceTree.length}
            summaryStatus={cluster.summary.resourcesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.FENCE_DEVICES} data-test="fence-devices">
          <DashboardClusterCellSummary
            itemsCount={cluster.fenceDeviceList.length}
            summaryStatus={cluster.summary.fenceDevicesSeverity}
          />
        </Toggle>
      </tr>
      <Content expandKey={COLUMNS.ISSUES}>
        <IssueList margin issueList={cluster.issueList} />
      </Content>
      <Content expandKey={COLUMNS.NODES}>
        <DashboardClusterNodes cluster={cluster} />
      </Content>
      <Content expandKey={COLUMNS.RESOURCES}>
        <DashboardClusterResources cluster={cluster} />
      </Content>
      <Content expandKey={COLUMNS.FENCE_DEVICES}>
        <DashboardClusterFenceDevices cluster={cluster} />
      </Content>
    </Table.Body>
  );
};
