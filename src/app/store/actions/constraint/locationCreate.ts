type ResourceSpecification = "resource" | "pattern";
type LocationSpecification = "node" | "rule";
type LocationPreference = "prefer" | "avoid";

export type LocationCreateActions = {
  "CONSTRAINT.LOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.LOCATION.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      score?: string;
      resourceSpecification?: ResourceSpecification;
      resourceId?: string;
      resourcePattern?: string;
      locationSpecification?: LocationSpecification;
      nodeName?: string;
      preference?: LocationPreference;
      rule?: string;
    };
  };

  "CONSTRAINT.LOCATION.CREATE": {
    type: "CONSTRAINT.LOCATION.CREATE";
    key: { clusterName: string };
    payload: {
      resourceSpecification: ResourceSpecification;
      resourceValue: string;
      locationSpecification: LocationSpecification;
      nodeName: string;
      rule: string;
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
