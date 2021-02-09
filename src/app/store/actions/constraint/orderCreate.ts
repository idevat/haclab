type Action = "start" | "promote" | "demote" | "stop";
export type OrderCreateActions = {
  "CONSTRAINT.ORDER.CREATE.UPDATE": {
    type: "CONSTRAINT.ORDER.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      firstResourceId?: string;
      firstAction?: Action;
      thenResourceId?: string;
      thenAction?: Action;
    };
  };

  "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES": {
    type: "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES";
    key: { clusterName: string };
  };

  "CONSTRAINT.ORDER.CREATE": {
    type: "CONSTRAINT.ORDER.CREATE";
    key: { clusterName: string };
    payload: {
      firstResourceId: string;
      firstAction: Action;
      thenResourceId: string;
      thenAction: Action;
    };
  };

  "CONSTRAINT.ORDER.CREATE.OK": {
    type: "CONSTRAINT.ORDER.CREATE.OK";
    key: { clusterName: string };
  };

  "CONSTRAINT.ORDER.CREATE.FAIL": {
    type: "CONSTRAINT.ORDER.CREATE.FAIL";
    key: { clusterName: string };
    payload: { message: string };
  };

  "CONSTRAINT.ORDER.CREATE.FAIL.RECOVER": {
    type: "CONSTRAINT.ORDER.CREATE.FAIL.RECOVER";
    key: { clusterName: string };
  };

  "CONSTRAINT.ORDER.CREATE.CLOSE": {
    type: "CONSTRAINT.ORDER.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
