import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ConstraintCreateLocationConfigureFooter: React.FC = () => {
  const {
    close,
    wizard: { onBack, onNext },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={onNext} />
      <WizardButtonBack onClick={onBack} disabled />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
