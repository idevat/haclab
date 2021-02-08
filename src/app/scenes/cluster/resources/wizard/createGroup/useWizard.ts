import { ActionMap, selectors } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view";

export const useWizard = () => {
  const clusterWizard = useClusterWizard("wizardResourceGroup");

  const { clusterName, dispatch } = clusterWizard;
  const [topLevelPrimitives] = useClusterSelector(
    selectors.getTopLevelPrimitives,
  );

  const {
    state: { resourceIdList, groupId },
  } = clusterWizard;

  const availableResources = topLevelPrimitives.filter(
    p => !resourceIdList.includes(p),
  );

  return {
    ...clusterWizard,
    close: () => {
      clusterWizard.close();
      dispatch({
        type: "RESOURCE.GROUP.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    availableResources,

    // actions
    updateState: (
      payload: ActionMap["RESOURCE.GROUP.CREATE.UPDATE"]["payload"],
    ) =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE.UPDATE",
        key: { clusterName: clusterName },
        payload,
      }),

    createGroup: () =>
      dispatch({
        type: "RESOURCE.GROUP.CREATE",
        key: { clusterName: clusterName },
        payload: {
          resourceIdList: resourceIdList,
          groupId: groupId,
        },
      }),
  };
};
