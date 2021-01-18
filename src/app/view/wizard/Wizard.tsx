import React from "react";
import {
  Wizard as PfWizard,
  WizardContextConsumer,
  WizardFooter,
  WizardStep,
} from "@patternfly/react-core";

const DefaultWizardStep: React.FC = () => {
  return <>DEFAULT WIZARD STEP</>;
};

type Step = WizardStep & { footer?: React.ReactNode };

const defaultSteps: Step[] = [
  {
    name: "Default wizard step",
    component: <DefaultWizardStep />,
  },
];

export const Wizard: React.FC<{
  ["data-test"]: string;
  steps?: Step[] | undefined;
  onClose: () => void;
  title: string;
  description: string;
}> = ({
  "data-test": dataTest,
  onClose,
  title,
  description,
  steps = undefined,
}) => {
  const stepList: WizardStep[] = [];
  const footerList: { name: React.ReactNode; footer: React.ReactNode }[] = [];

  (steps || defaultSteps).forEach((stepWithFooter) => {
    if ("footer" in stepWithFooter) {
      const { footer, ...pfStep } = stepWithFooter;
      footerList.push({ name: stepWithFooter.name, footer });
      stepList.push(pfStep);
    } else {
      stepList.push(stepWithFooter);
    }
  });

  return (
    <PfWizard
      data-test={dataTest}
      steps={stepList}
      isOpen
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <WizardFooter>
          <WizardContextConsumer>
            {({ activeStep }) =>
              footerList.find(f => f.name === activeStep.name)?.footer
            }
          </WizardContextConsumer>
        </WizardFooter>
      }
    />
  );
};
