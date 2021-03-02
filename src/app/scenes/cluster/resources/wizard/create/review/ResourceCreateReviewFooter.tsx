import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateReviewFooter: React.FC = () => {
  const {
    close,
    create,
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext
        onClick={() => {
          create({ force: false });
          onNext();
        }}
        label="Create resource"
      />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
