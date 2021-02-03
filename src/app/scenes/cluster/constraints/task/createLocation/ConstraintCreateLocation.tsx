import React from "react";
import { Button, Modal } from "@patternfly/react-core";

import { EmptyStateSpinner, WizardFinishError, WizardSuccess } from "app/view";

import { useWizard } from "./useWizard";
import { ConstraintCreateLocationConfigure } from "./ConstraintCreateLocationConfigure";

export const ConstraintCreateLocation: React.FC = () => {
  const {
    close,
    createLocation,
    recoverFromError,
    state: { response, resultMessage },
  } = useWizard();

  let actions = [
    <Button key="CreateLocation" variant="primary" onClick={createLocation}>
      Create location
    </Button>,
    <Button key="Cancel" variant="link" onClick={close}>
      Cancel
    </Button>,
  ];

  if (response === "fail") {
    actions = [
      <Button
        key="recoverFromError"
        variant="primary"
        onClick={recoverFromError}
      >
        Start from the beginning
      </Button>,
      <Button key="tryAgain" variant="link" onClick={createLocation}>
        Try again
      </Button>,
      <Button key="cancel" variant="link" onClick={close}>
        Cancel
      </Button>,
    ];
  }

  return (
    <Modal
      variant="medium"
      title="Create location constraint"
      isOpen
      onClose={close}
      actions={actions}
    >
      {response === "" && <ConstraintCreateLocationConfigure />}
      {response === "sending" && (
        <EmptyStateSpinner title="Creating location constraint" />
      )}
      {response === "ok" && (
        <WizardSuccess title={"Location created successfully"} />
      )}
      {response === "fail" && (
        <WizardFinishError
          title={"Create location constraint failed"}
          message={resultMessage}
        />
      )}
    </Modal>
  );
};
