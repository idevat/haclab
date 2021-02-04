import React from "react";
import { Button } from "@patternfly/react-core";

import { EmptyStateSpinner, WizardFinishError, WizardSuccess } from "app/view";

import { useWizard } from "./useWizard";
export const ConstraintCreateLocationFinish: React.FC = () => {
  const {
    close,
    createLocation,
    recoverFromError,
    state: { response, resultMessage },
  } = useWizard();
  switch (response) {
    case "sending":
      return <EmptyStateSpinner title="Creating location constraint" />;
    case "ok":
      return <WizardSuccess title={"Location created successfully"} />;
    default:
      return (
        <WizardFinishError
          title={"Create location constraint failed"}
          message={resultMessage}
          primaryActions={
            <Button
              key="recoverFromError"
              variant="primary"
              onClick={recoverFromError}
            >
              Start from the beginning
            </Button>
          }
          secondaryActions={
            <>
              <Button key="tryAgain" variant="link" onClick={createLocation}>
                Try again
              </Button>
              <Button key="cancel" variant="link" onClick={close}>
                Cancel
              </Button>
            </>
          }
        />
      );
  }
};
