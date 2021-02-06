import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.addConstraintRuleRemote;

export const addConstraintRuleRemote = async (
  clusterName: string,
  constraint: {
    location: {
      resourceSpecification: "resource" | "pattern";
      resourceValue: string;
      rule: string;
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
    rule,
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
      ["rule", rule],
      ["score", score],
      ...force,
    ],
  });
};
