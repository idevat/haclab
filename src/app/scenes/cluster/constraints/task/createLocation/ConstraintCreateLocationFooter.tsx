import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";

export const ConstraintCreateLocationFooter: React.FC = () => {
  const {
    close,
    createLocation,
    state: { response },
  } = useWizard();
  if (response !== "") {
    return null;
  }
  return (
    <>
      <Button key="CreateLocation" variant="primary" onClick={createLocation}>
        Create location
      </Button>
      <Button key="Cancel" variant="link" onClick={close}>
        Cancel
      </Button>
    </>
  );
};
