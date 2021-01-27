import React from "react";
import { Button } from "@patternfly/react-core/dist/js/components/Button/Button";

import { WizardFinishError, WizardProgress, WizardSuccess } from "app/view";

import { useWizard } from "../useWizard";

export const ConstraintCreateLocationFinish: React.FC = () => {
  const {
    close,
    recoverFromError,
    createLocation,
    state: { resultStatus, resultMessage },
  } = useWizard();

  switch (resultStatus) {
    case "ok":
      return (
        <WizardSuccess
          title={"Location constraint created successfully"}
          primaryActions={
            <Button variant="link" onClick={close}>
              Close
            </Button>
          }
        />
      );

    case "fail":
      return (
        <WizardFinishError
          title={"Create location constraint failed"}
          message={resultMessage}
          primaryActions={
            <Button variant="primary" onClick={recoverFromError}>
              Back to first step
            </Button>
          }
          secondaryActions={
            <>
              <Button variant="link" onClick={createLocation}>
                Try again
              </Button>
              <Button variant="link" onClick={close}>
                Cancel
              </Button>
            </>
          }
        />
      );

    default:
      return (
        <WizardProgress
          title={"Create location constraint progress"}
          progressTitle="Creating location constraint"
        />
      );
  }
};
