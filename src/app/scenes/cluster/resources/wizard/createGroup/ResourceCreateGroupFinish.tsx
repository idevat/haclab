import React from "react";

import { WizardLibReports, WizardSuccess } from "app/view";

import { useWizard } from "./useWizard";

export const ResourceCreateGroupFinish: React.FC = () => {
  const {
    state: { groupId, reports },
  } = useWizard();
  return (
    <>
      <WizardSuccess title={`Group "${groupId}" created successfully`} />
      <WizardLibReports reports={reports} />
    </>
  );
};
