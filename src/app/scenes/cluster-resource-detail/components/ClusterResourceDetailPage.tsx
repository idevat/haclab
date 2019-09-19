import React from "react";

import { useClusterState } from "app/services/cluster";
import { ResourceDetailPage } from "app/scenes/cluster-resource-detail";

const ClusterResourceDetailPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => {
  useClusterState(clusterUrlName);
  return (
    <ResourceDetailPage
      clusterUrlName={clusterUrlName}
      resourceUrlName={resourceUrlName}
      currentTab="Details"
    >
      Details
    </ResourceDetailPage>
  );
};

export default ClusterResourceDetailPage;
