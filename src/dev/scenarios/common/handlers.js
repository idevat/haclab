import * as endpoints from "dev/api/endpoints";

export const importedClusterList = response =>
  endpoints.importedClusterList((_req, res) => {
    res.json(response);
  });

export const clusterStatus = (responseMap = {}) =>
  endpoints.clusterStatus((req, res) => {
    const clusterName = req.params.clusterUrlName;
    if (Object.keys(responseMap).includes(clusterName)) {
      res.json(responseMap[clusterName]);
    } else {
      res.status(404).send("Not found");
    }
  });

export const getResourceAgentMetadata = responseMap =>
  endpoints.getResourceAgentMetadata((req, res) => {
    const agentName = req.query.agent;
    if (Object.keys(responseMap).includes(agentName)) {
      res.json(responseMap[agentName]);
    } else {
      res.status(404).send("Not found");
    }
  });

export const getAvailResourceAgents = response =>
  endpoints.getAvailResourceAgents((_req, res) => {
    res.json(response);
  });

export const getFenceAgentMetadata = response =>
  endpoints.getFenceAgentMetadata((_req, res) => {
    res.json(response);
  });

export const clusterProperties = response =>
  endpoints.clusterProperties((_req, res) => {
    res.json(response);
  });