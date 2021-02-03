import { ActionMap, selectors } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view";

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "constraint-location-create",
    selectors.getTaskConstraintLocationCreateState,
  );

  const { clusterName, dispatch, state, wizard, close } = clusterWizard;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  return {
    ...clusterWizard,
    nodeNameList: clusterStatus.nodeList.map(n => n.name),
    resourceTree: clusterStatus.resourceTree,

    // actions
    updateState: (
      payload: ActionMap["CONSTRAINT.LOCATION.CREATE.UPDATE"]["payload"],
    ) =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    createLocation: () =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE",
        key: { clusterName },
        payload: {
          resourceId: state.resourceId,
          nodeName: state.nodeName,
          score: state.score,
        },
      }),

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.FAIL.RECOVER",
        key: { clusterName },
      });
      wizard.goToStepByName("Select type");
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
