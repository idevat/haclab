import React from "react";

import { TaskSimple } from "app/view";

import { useWizard } from "./useWizard";
import { ResourceCreateGroupForm } from "./ResourceCreateGroupForm";
import { ResourceCreateGroupFinish } from "./ResourceCreateGroupFinish";
import { ResourceCreateGroupFooter } from "./ResourceCreateGroupFooter";

export const ResourceCreateGroup: React.FC = () => {
  const {
    close,
    state: { response },
  } = useWizard();

  return (
    <TaskSimple
      title="Create group"
      close={close}
      footer={<ResourceCreateGroupFooter />}
    >
      {response !== "success" && <ResourceCreateGroupForm />}
      {response === "success" && <ResourceCreateGroupFinish />}
    </TaskSimple>
  );
};
