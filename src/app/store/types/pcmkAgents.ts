export type AgentParameter = {
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string | number | null;
};
export type Agent = {
  loadStatus: "LOADING" | "LOADED" | "RELOADING" | "FAILED";
  shortdesc: string;
  longdesc: string;
  parameters: AgentParameter[];
};

export type ResourceAgentParameter = AgentParameter;
export type ResourceAgent = Agent;
export type ResourceAgentsStorage = Record<string, ResourceAgent>;

export type FenceAgentParameter = AgentParameter & {
  deprecated: boolean;
};
export type FenceAgent = Agent & {
  parameters: FenceAgentParameter[];
};
export type FenceAgentsStorage = Record<string, FenceAgent>;

export type AgentsStorage = ResourceAgentsStorage | FenceAgentsStorage;
