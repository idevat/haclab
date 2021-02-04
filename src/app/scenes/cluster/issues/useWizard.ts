import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view/useClusterSelector";

export const useWizard = () => {
  const dispatch = useDispatch();
  const [
    { authProcessId, open, fixing, errorMessage, authAttemptInProgress },
    clusterName,
  ] = useClusterSelector(selectors.getFixAuth);
  return {
    open,
    fixing,
    errorMessage,
    authAttemptInProgress,
    authProcessId,

    cancel: () =>
      dispatch({
        type: "CLUSTER.FIX_AUTH.CANCEL",
        key: { clusterName },
      }),

    fixAuthStart: (initialNodeList: string[]) => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.START",
        key: { clusterName },
        payload: { initialNodeList },
      });
    },

    fixAuthDone: () => {
      dispatch({
        type: "CLUSTER.FIX_AUTH.AUTH_DONE",
        key: { clusterName },
      });
    },
  };
};
