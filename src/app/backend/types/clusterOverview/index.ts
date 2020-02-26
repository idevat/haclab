/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiResource as TApiResource } from "../clusterStatus";
import { ApiNode } from "./nodes";
import { ApiClusterStatus as TApiClusterStatus } from "./cluster";

export type ApiResource = TApiResource;
export type ApiClusterStatus = t.TypeOf<typeof TApiClusterStatus>;
export type ApiNode = t.TypeOf<typeof ApiNode>;

export const TApiClustersOverview = t.type({
  cluster_list: t.array(TApiClusterStatus),
});
export type ApiClustersOverview = t.TypeOf<typeof TApiClustersOverview>;
