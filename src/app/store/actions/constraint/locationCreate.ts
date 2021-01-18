export type LocationCreateActions = {
  "CONSTRAINT.LOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.LOCATION.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      score?: string;
      node?: string;
    };
  };
};
