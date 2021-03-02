import React from "react";
import { Button } from "@patternfly/react-core";

import { api } from "app/backend";
import { WizardFinishError, WizardLibReports } from "app/view";

import { useWizard } from "../useWizard";

const allErrorsCanBeForced = (reports: api.types.lib.Report[]) =>
  reports.every(
    r => r.severity.level !== "ERROR" || r.severity.force_code !== null,
  );

export const ResourceCreateFinishFail: React.FC = () => {
  const {
    state: { resourceName, reports },
    wizard: { goToStepByName },
    close,
    create,
  } = useWizard();

  const isForcible = allErrorsCanBeForced(reports);
  return (
    <>
      <WizardFinishError
        title={`Create resource "${resourceName}" failed`}
        message={
          <>
            Create resource failed in the backend (see messages below). You can
            return back, correct values and try to create resource again. The
            messages will be kept in the wizard.
            {isForcible && (
              <>
                {" "}
                Also, you can force the action since all errors are forcible.
              </>
            )}
          </>
        }
        primaryActions={
          <Button
            variant="primary"
            onClick={() => goToStepByName("Name and type")}
          >
            Back to first step
          </Button>
        }
        secondaryActions={
          <>
            {isForcible && (
              <Button variant="link" onClick={() => create({ force: true })}>
                Create resource (forced)
              </Button>
            )}
            <Button variant="link" onClick={close}>
              Cancel
            </Button>
          </>
        }
      />
      <WizardLibReports reports={reports} />
    </>
  );
};
