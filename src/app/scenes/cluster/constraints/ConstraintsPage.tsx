import React from "react";
import { useSelector } from "react-redux";
import {
  ActionList,
  ActionListItem,
  Card,
  CardBody,
  PageSection,
  Stack,
  StackItem,
  ToolbarItem,
} from "@patternfly/react-core";

import { selectors, types } from "app/store";
import {
  ClusterSectionToolbar,
  EmptyStateNoItem,
  ToolbarFilterAction,
  ToolbarFilterGroups,
} from "app/view";

import { ConstraintList } from "./ConstraintList";
import {
  ConstraintCreateLocationToolbarItem,
  ConstraintCreateOrderToolbarItem,
} from "./task";

type ConstraintPack = types.cluster.ConstraintPack;

const filterGroups = {
  Location: false,
  "Location (rule)": false,
  Colocation: false,
  "Colocation (set)": false,
  Order: false,
  "Order (set)": false,
  Ticket: false,
  "Ticket (set)": false,
};
const useState = () => {
  const groupState = ToolbarFilterGroups.useState(filterGroups);
  const [groupInclusionMap] = groupState;

  const filterConstraintTypes = React.useCallback(
    (constraintPacks: ConstraintPack[]): ConstraintPack[] =>
      constraintPacks.filter(cp =>
        ToolbarFilterGroups.allOrIncludedGroupMembers({
          groupInclusionMap,
          groupMembershipMap: { ...filterGroups, [cp.type]: true },
        }),
      ),
    [groupInclusionMap],
  );
  return {
    filterState: {
      groupState,
    },
    filterConstraintTypes,
  };
};

export const ConstraintsPage: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  const constraintPacks = useSelector(selectors.getConstraints(clusterName));
  const { filterState, filterConstraintTypes } = useState();
  const clearAllFilters = () => {
    const [groupInclusionMap, setGroupInclusionMap] = filterState.groupState;
    setGroupInclusionMap(
      ToolbarFilterGroups.unselectAllOptions(groupInclusionMap),
    );
  };
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <ConstraintCreateLocationToolbarItem />
          </ActionListItem>
          <ActionListItem>
            <ConstraintCreateOrderToolbarItem />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <PageSection>
        <Card>
          <CardBody>
            <Stack hasGutter>
              {constraintPacks.length === 0 && (
                <StackItem>
                  <EmptyStateNoItem
                    title="No constraint is configured."
                    message="You don't have any configured constraint here."
                  />
                </StackItem>
              )}
              {constraintPacks.length !== 0 && (
                <>
                  <StackItem>
                    <ToolbarFilterAction clearAllFilters={clearAllFilters}>
                      <ToolbarItem>
                        <ToolbarFilterGroups
                          name="Constraint type"
                          filterState={filterState.groupState}
                        />
                      </ToolbarItem>
                    </ToolbarFilterAction>
                  </StackItem>
                  <StackItem>
                    <ConstraintList
                      constraintPacks={filterConstraintTypes(constraintPacks)}
                    />
                  </StackItem>
                </>
              )}
            </Stack>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};
