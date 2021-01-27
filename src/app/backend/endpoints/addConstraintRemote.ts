import { endpoint } from "./endpoint";

export const addConstraintRemote = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/add_constraint_remote`,
  method: "post",
  shape: undefined,
});
