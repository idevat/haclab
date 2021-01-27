import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ConstraintCreateLocationReviewFooter: React.FC = () => {
  const {
    close,
    createLocation,
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext
        onClick={() => {
          createLocation();
          onNext();
        }}
        label="Finish"
      />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
