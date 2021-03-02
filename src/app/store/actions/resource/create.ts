import { api } from "app/backend";

export type ResourceCreateActions = {
  "RESOURCE.CREATE": {
    type: "RESOURCE.CREATE";
    key: { clusterName: string };
    payload: {
      resourceName: string;
      agentName: string;
      instanceAttrs: Record<string, string>;
      disabled: boolean;
      force: boolean;
    };
  };

  "RESOURCE.CREATE.SUCCESS": {
    type: "RESOURCE.CREATE.SUCCESS";
    key: { clusterName: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.CREATE.ERROR": {
    type: "RESOURCE.CREATE.ERROR";
    key: { clusterName: string };
  };

  "RESOURCE.CREATE.FAIL": {
    type: "RESOURCE.CREATE.FAIL";
    key: { clusterName: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.CREATE.UPDATE": {
    type: "RESOURCE.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      agentName?: string;
      resourceName?: string;
      clone?: boolean;
      promotable?: boolean;
      disabled?: boolean;
      instanceAttrs?: Record<string, string>;
      useGroup?: "no" | "existing" | "new";
      group?: string;
    };
  };

  "RESOURCE.CREATE.CLOSE": {
    type: "RESOURCE.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
