import React from "react";

import { Wizard } from "app/view";

import { useWizard } from "./useWizard";
import {
  ConstraintCreateLocationSelectType,
  ConstraintCreateLocationSelectTypeFooter,
} from "./step1SelectType";
import {
  ConstraintCreateLocationConfigure,
  ConstraintCreateLocationConfigureFooter,
} from "./step2Configure";
import { ConstraintCreateLocationFinish } from "./finish";
import {
  ConstraintCreateLocationReview,
  ConstraintCreateLocationReviewFooter,
} from "./review";

export const ConstraintCreateLocation: React.FC = () => {
  const { close } = useWizard();

  return (
    <Wizard
      data-test="constraint-location-create"
      onClose={close}
      title="New location"
      description="Creat new location constraint"
      steps={[
        {
          name: "Select type",
          component: <ConstraintCreateLocationSelectType />,
          footer: <ConstraintCreateLocationSelectTypeFooter />,
        },
        {
          name: "Prepare cluster for node",
          component: <ConstraintCreateLocationConfigure />,
          footer: <ConstraintCreateLocationConfigureFooter />,
        },
        {
          name: "Review",
          component: <ConstraintCreateLocationReview />,
          footer: <ConstraintCreateLocationReviewFooter />,
        },
        {
          name: "Result",
          component: <ConstraintCreateLocationFinish />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
