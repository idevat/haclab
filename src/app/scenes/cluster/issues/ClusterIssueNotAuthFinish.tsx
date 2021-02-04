import React from "react";
import { Alert } from "@patternfly/react-core";

import { EmptyStateSpinner } from "app/view";
import { useClusterSelector } from "app/view/useClusterSelector";
import { selectors } from "app/store";

export const ClusterIssueNotAuthFinish: React.FC = () => {
  const [{ fixing, errorMessage }] = useClusterSelector(selectors.getFixAuth);
  if (fixing) {
    <EmptyStateSpinner title="Distributing auth tokens to cluster" />;
  }
  if (errorMessage.length > 0) {
    return (
      <Alert
        isInline
        variant="danger"
        title="Distribution of auth tokens to cluster failed"
      >
        {errorMessage}
      </Alert>
    );
  }
  return (
    <Alert
      isInline
      variant="success"
      title="Authentication sucessfully fixed"
    />
  );
};
