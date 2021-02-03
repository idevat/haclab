import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons/dist/js/icons";

import * as pallete from "app/view/pallete";

export const WizardFinishError: React.FC<{
  title: React.ReactNode;
  message: React.ReactNode;
  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}> = ({
  title,
  message,
  primaryActions = undefined,
  secondaryActions = undefined,
}) => {
  return (
    <EmptyState>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      <EmptyStateBody>{message}</EmptyStateBody>
      {primaryActions}
      <EmptyStateSecondaryActions>
        {secondaryActions}
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
