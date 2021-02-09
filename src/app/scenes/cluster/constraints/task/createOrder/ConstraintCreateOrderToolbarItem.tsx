import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple } from "app/view";

import { useWizard } from "./useWizard";
import { ConstraintCreateOrderConfigure } from "./ConstraintCreateOrderConfigure";
import { ConstraintCreateOrderFooter } from "./ConstraintCreateOrderFooter";
import { ConstraintCreateOrderFinish } from "./ConstraintCreateOrderFinish";

export const ConstraintCreateOrderToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    isOpened,
    state: { response },
  } = useWizard();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-order-create"
      >
        Create Order
      </Button>
      {isOpened && (
        <TaskSimple
          title="Create order constraint"
          close={close}
          footer={<ConstraintCreateOrderFooter />}
        >
          {response === "" && <ConstraintCreateOrderConfigure />}
          {response !== "" && <ConstraintCreateOrderFinish />}
        </TaskSimple>
      )}
    </>
  );
};
