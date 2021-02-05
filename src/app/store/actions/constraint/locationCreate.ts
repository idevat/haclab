type ResourceSpecification = "resource" | "pattern";
export type LocationCreateActions = {
  "CONSTRAINT.LOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.LOCATION.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      score?: string;
      resourceSpecification?: ResourceSpecification;
      resourceId?: string;
      resourcePattern?: string;
      nodeName?: string;
    };
  };

  "CONSTRAINT.LOCATION.CREATE": {
    type: "CONSTRAINT.LOCATION.CREATE";
    key: { clusterName: string };
    payload: {
      resourceSpecification: ResourceSpecification;
      resourceValue: string;
      nodeName: string;
      score: string;
    };
  };

  "CONSTRAINT.LOCATION.CREATE.OK": {
    type: "CONSTRAINT.LOCATION.CREATE.OK";
    key: { clusterName: string };
  };

  "CONSTRAINT.LOCATION.CREATE.FAIL": {
    type: "CONSTRAINT.LOCATION.CREATE.FAIL";
    key: { clusterName: string };
    payload: { message: string };
  };

  "CONSTRAINT.LOCATION.CREATE.FAIL.RECOVER": {
    type: "CONSTRAINT.LOCATION.CREATE.FAIL.RECOVER";
    key: { clusterName: string };
  };

  "CONSTRAINT.LOCATION.CREATE.CLOSE": {
    type: "CONSTRAINT.LOCATION.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
