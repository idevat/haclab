import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";

export const ResourceCreateGroupFooter: React.FC = () => {
  const {
    close,
    createGroup,
    state: { groupId, resourceIdList, response },
  } = useWizard();

  if (response === "success") {
    return (
      <Button key="Cancel" variant="primary" onClick={close}>
        Close
      </Button>
    );
  }
  return (
    <>
      <Button
        key="CreateGroup"
        variant="primary"
        onClick={createGroup}
        isDisabled={groupId.length === 0 || resourceIdList.length < 2}
      >
        Create group
      </Button>
      <Button key="Cancel" variant="link" onClick={close}>
        Cancel
      </Button>
    </>
  );
};
