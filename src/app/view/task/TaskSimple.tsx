import React from "react";
import { Modal } from "@patternfly/react-core";

export const TaskSimple: React.FC<{
  close: () => void;
  footer: React.ReactNode;
  title: React.ComponentProps<typeof Modal>["title"];
}> = ({ close, footer, children, title }) => {
  return (
    <Modal
      variant="medium"
      title={title}
      isOpen
      onClose={close}
      actions={[<React.Fragment key="footer">{footer}</React.Fragment>]}
    >
      {children}
    </Modal>
  );
};
