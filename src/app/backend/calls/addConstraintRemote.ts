import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.addConstraintRemote;

type Order = {
  resourceId: string;
  action: "start" | "promote" | "demote" | "stop";
  order: "after" | "before";
  otherResourceId: string;
  otherAction: "start" | "promote" | "demote" | "stop";
};

type Location = {
  resourceSpecification: "resource" | "pattern";
  resourceValue: string;
  nodeName: string;
  score: string;
};

type Constraint = ({ location: Location } | { order: Order }) & {
  force?: boolean;
};

const orderParams = ({
  resourceId,
  action,
  order,
  otherResourceId,
  otherAction,
}: Order): [string, string][] => [
  ["c_type", "ord"],
  ["res_id", resourceId],
  ["res_action", action],
  ["order", order],
  ["target_res_id", otherResourceId],
  ["target_action", otherAction],
];

const locationParams = ({
  resourceSpecification,
  resourceValue,
  nodeName,
  score,
}: Location): [string, string][] => [
  ["c_type", "loc"],
  [
    "res_id",
    resourceSpecification === "pattern"
      ? `regexp%${resourceValue}`
      : resourceValue,
  ],
  ["node_id", nodeName],
  ["score", score],
];

const params = (constraint: Constraint) => {
  const force: [string, string][] =
    "force" in constraint && constraint.force === true
      ? [["force", "true"]]
      : [];

  if ("order" in constraint) {
    return [...orderParams(constraint.order), ...force];
  }

  return [...locationParams(constraint.location), ...force];
};

export const addConstraintRemote = async (
  clusterName: string,
  constraint: Constraint,
): api.CallResult =>
  http.post(url({ clusterName }), { params: params(constraint) });
