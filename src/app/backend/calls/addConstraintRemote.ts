import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.addConstraintRemote;

export const addConstraintRemote = async (
  clusterName: string,
  constraint: {
    location: {
      resourceSpecification: "resource" | "pattern";
      resourceValue: string;
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

  const {
    resourceSpecification,
    resourceValue,
    nodeName,
    score,
  } = constraint.location;
  return http.post(url({ clusterName }), {
    params: [
      ["c_type", "loc"],
      [
        "res_id",
        resourceSpecification === "pattern"
          ? `regexp%${resourceValue}`
          : resourceValue,
      ],
      ["node_id", nodeName],
      ["score", score],
      ...force,
    ],
  });
};
