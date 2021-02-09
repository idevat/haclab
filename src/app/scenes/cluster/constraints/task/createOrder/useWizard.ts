import { ActionMap, selectors } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view";

export const useWizard = () => {
  const clusterWizard = useClusterWizard("taskConstraintOrderCreate");
  const { clusterName, dispatch, state, close } = clusterWizard;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  return {
    ...clusterWizard,
    resourceIdList: clusterStatus.resourceTree.reduce<string[]>(
      (idList, resource) => {
        if (resource.itemType === "primitive") {
          return [...idList, resource.id];
        }

        if (resource.itemType === "group") {
          return [...idList, resource.id, ...resource.resources.map(r => r.id)];
        }

        return idList;
      },
      [],
    ),

    //actions
    updateState: (
      payload: ActionMap["CONSTRAINT.ORDER.CREATE.UPDATE"]["payload"],
    ) =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    createOrder: () =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE",
        key: { clusterName },
        payload: {
          firstResourceId: state.firstResourceId,
          firstAction: state.firstAction,
          thenResourceId: state.thenResourceId,
          thenAction: state.thenAction,
        },
      }),

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.FAIL.RECOVER",
        key: { clusterName },
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    swapResources: () =>
      dispatch({
        type: "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES",
        key: { clusterName },
      }),
  };
};
