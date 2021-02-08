import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { selectors, useDispatch } from "app/store";
import { types } from "app/store/state";
import { useWizardOpenClose } from "app/view";
import { useClusterSelector } from "app/view/useClusterSelector";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function useClusterWizard<
  NAME extends keyof types.clusterStorage.ClusterStorageItem,
>(clusterPartName: NAME) {
  const [state, clusterName] = useClusterSelector(
    selectors.getClusterPart(clusterPartName),
  );
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(clusterPartName);
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
