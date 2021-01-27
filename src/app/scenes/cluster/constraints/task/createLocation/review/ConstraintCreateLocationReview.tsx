import React from "react";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const ConstraintCreateLocationReview: React.FC = () => {
  const {
    state: { resourceId, nodeName, score },
  } = useWizard();
  return (
    <WizardLibStep title="Review new resource configuration">
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>Resource</DescriptionListTerm>
          <DescriptionListDescription>{resourceId}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Node</DescriptionListTerm>
          <DescriptionListDescription>{nodeName}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Score</DescriptionListTerm>
          <DescriptionListDescription>{score}</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </WizardLibStep>
  );
};
