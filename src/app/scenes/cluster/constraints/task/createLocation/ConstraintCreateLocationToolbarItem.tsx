import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { ConstraintCreateLocation } from "./ConstraintCreateLocation";

export const ConstraintCreateLocationToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-location-create"
      >
        Create Location
      </Button>
      {isOpened && <ConstraintCreateLocation />}
    </>
  );
};
