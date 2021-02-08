import { ActionMap, selectors, useSelector } from "app/store";
import { useClusterSelector, useClusterWizard } from "app/view";

const useAgent = (clusterName: string, agentName: string) => {
  const agent = useSelector(selectors.getPcmkAgent(clusterName, agentName));
  return {
    agent,
    isAgentLoaded:
      agent
      && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
  };
};

export const useWizard = () => {
  const clusterWizard = useClusterWizard("wizardResourceCreate");
  const { clusterName, state, dispatch } = clusterWizard;
  const [groupList] = useClusterSelector(selectors.getGroups);
  const { agent, isAgentLoaded } = useAgent(clusterName, state.agentName);

  return {
    ...clusterWizard,
    groupList,
    isAgentLoaded,

    // validations
    isNameTypeValid:
      state.resourceName.length > 0 && state.agentName.length > 0,

    areInstanceAttrsValid:
      isAgentLoaded
      && agent.parameters.every(
        param => !param.required || param.name in state.instanceAttrs,
      ),

    areSettingsValid: state.useGroup !== "new" || state.group.length > 0,

    // actions
    close: () => {
      clusterWizard.close();
      dispatch({
        type: "RESOURCE.CREATE.CLOSE",
        key: { clusterName },
      });
    },

    updateState: (payload: ActionMap["RESOURCE.CREATE.UPDATE"]["payload"]) => {
      dispatch({
        type: "RESOURCE.CREATE.UPDATE",
        key: { clusterName },
        payload,
      });
    },

    create: ({ force }: { force: boolean }) =>
      dispatch({
        type: "RESOURCE.CREATE",
        key: { clusterName },
        payload: {
          agentName: state.agentName,
          resourceName: state.resourceName,
          instanceAttrs: state.instanceAttrs,
          disabled: state.disabled,
          force,
        },
      }),
  };
};
