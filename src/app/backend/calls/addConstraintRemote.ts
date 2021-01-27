import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.addConstraintRemote;

export const addConstraintRemote = async (
  clusterName: string,
  constraint: {
    location: {
      resourceId: string;
      nodeName: string;
      score: string;
      force?: boolean;
    };
  },
): api.CallResult => {
  const force: [string, string][] =
    "force" in constraint.location && constraint.location.force === true
      ? [["force", "true"]]
      : [];
  return http.post(url({ clusterName }), {
    params: [
      ["c_type", "loc"],
      ["res_id", constraint.location.resourceId],
      ["node_id", constraint.location.nodeName],
      ["score", constraint.location.score],
      ...force,
    ],
  });
};
