import { ActionMap, selectors } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view";

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "constraint-location-create",
    selectors.getTaskConstraintLocationCreateState,
  );

  const { clusterName, dispatch } = clusterWizard;
  const [nodeNameList] = useClusterSelector(selectors.getNodeNameList);

  return {
    ...clusterWizard,
    nodeNameList,
    updateState: (
      payload: ActionMap["CONSTRAINT.LOCATION.CREATE.UPDATE"]["payload"],
    ) =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),
  };
};
