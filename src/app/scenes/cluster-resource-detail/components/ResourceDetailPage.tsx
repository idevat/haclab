import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Level,
  LevelItem,
  Button,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";
import { push } from "connected-react-router";

import * as url from "app/common/urls";
import { UrlTabs } from "app/common/components";
import {
  ClusterPage,
  selectors as clusterSelectors,
} from "app/services/cluster";
import { ResourceList } from "app/scenes/cluster-resource-list/";

const labelUrlCreateMap = {
  Details: url.resourcesDetail,
  Attributes: url.resourcesAttributes,
};

const ResourceDetailPage = (
  {
    clusterUrlName,
    resourceUrlName,
    currentTab,
    children,
  }: React.PropsWithChildren<{
    clusterUrlName: string,
    resourceUrlName: string,
    currentTab: keyof typeof labelUrlCreateMap,
  }>,
) => {
  const dispatch = useDispatch();
  const cluster = useSelector(clusterSelectors.getCluster);
  const tabSettingsMap = React.useMemo(
    UrlTabs.createLabelUrlMap(
      labelUrlCreateMap,
      (
        toUrl: (clusterUrlName: string, resourceUrlName: string) => string,
      ) => toUrl(clusterUrlName, resourceUrlName),
    ),
    [clusterUrlName],
  );
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      currentTab="Resources"
      pageSectionClassName="ha-m-full-height pf-m-fill"
    >
      <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
        <div className="pf-c-card ha-c-panel__tree-view">
          <ResourceList
            resourceList={cluster.resourceList}
            createResourceDetailUrl={
              ResourceList.createResourceDetailUrl(clusterUrlName)
            }
          />
        </div>
        <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
          <Stack gutter="md" className="pf-u-m-md">
            <StackItem>
              <Level>
                <LevelItem>
                  <UrlTabs
                    tabSettingsMap={tabSettingsMap}
                    currentTab={currentTab}
                  />
                </LevelItem>
                <LevelItem>
                  <Button
                    variant="plain"
                    aria-label="Close panel"
                    onClick={
                      (e: React.SyntheticEvent) => {
                        e.preventDefault();
                        dispatch(push(url.clusterResources(clusterUrlName)));
                      }
                    }
                  >
                    <TimesIcon />
                  </Button>
                </LevelItem>
              </Level>
            </StackItem>
            <StackItem>{children}</StackItem>
          </Stack>
        </div>
      </div>
    </ClusterPage>
  );
};

export default ResourceDetailPage;
