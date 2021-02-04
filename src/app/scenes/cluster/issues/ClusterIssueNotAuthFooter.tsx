import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { ClusterIssueNotAuthButton } from "./ClusterIssueNotAuthButton";

export const ClusterIssueNotAuthFooter: React.FC = () => {
  const {
    authProcessId,
    fixing,
    errorMessage,
    authAttemptInProgress,
    cancel,
    fixAuthDone,
  } = useWizard();

  if (authProcessId) {
    return (
      <>
        <ClusterIssueNotAuthButton
          authProcessId={authProcessId}
          isDisabled={authAttemptInProgress}
        />
        <Button variant="link" onClick={cancel}>
          Cancel
        </Button>
      </>
    );
  }

  if (fixing) {
    return null;
  }

  if (errorMessage.length > 0) {
    return (
      <>
        <Button variant="primary" onClick={fixAuthDone}>
          Try again
        </Button>
        <Button variant="link" onClick={cancel}>
          Cancel
        </Button>
      </>
    );
  }

  return (
    <Button variant="primary" onClick={cancel}>
      Close
    </Button>
  );
};
