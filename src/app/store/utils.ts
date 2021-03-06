import { compareStatusSeverity } from "./state/cluster/clusterStatus";

export { compareStatusSeverity };

export const isCibTrue = (value: string): boolean =>
  ["true", "on", "yes", "y", "1"].includes(value.toLowerCase());
