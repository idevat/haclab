import React from "react";
import { DefaultRootState } from "react-redux";
import { WizardContext } from "@patternfly/react-core";

import { useDispatch } from "app/store";
import { useWizardOpenClose } from "app/view";
import { useClusterSelector } from "app/view/useClusterSelector";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function useClusterWizard<
  A extends any[],
  S extends DefaultRootState,
  R,
>(
  wizardKey: string,
  selector: (clusterName: string, ...selectorArgs: A) => (state: S) => R,
  ...args: A
) {
  const [state, clusterName] = useClusterSelector(selector, ...args);
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(wizardKey);
  const pfWizardContext = React.useContext(WizardContext);

  return {
    // don't spread wizardContext to avoid conflict if patternfly adds something
    wizard: pfWizardContext,
    state,
    ...openClose,
    clusterName,
    dispatch,
    tryNext: (isValid: boolean) => {
      if (isValid) {
        dispatch({
          type: "CLUSTER.WIZARD.VALIDATION.HIDE",
          key: { clusterName },
        });
        pfWizardContext.onNext();
      } else {
        dispatch({
          type: "CLUSTER.WIZARD.VALIDATION.SHOW",
          key: { clusterName },
        });
      }
    },
  };
}
