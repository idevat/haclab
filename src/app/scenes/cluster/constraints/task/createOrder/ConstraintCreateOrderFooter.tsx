import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";

export const ConstraintCreateOrderFooter: React.FC = () => {
  const {
    close,
    createOrder,
    state: { response },
  } = useWizard();
  if (response !== "") {
    return null;
  }
  return (
    <>
      <Button variant="primary" onClick={createOrder}>
        Create order
      </Button>
      <Button variant="link" onClick={close}>
        Cancel
      </Button>
    </>
  );
};
