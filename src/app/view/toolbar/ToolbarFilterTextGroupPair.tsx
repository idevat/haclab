import React from "react";

import { ToolbarFilterAction } from "./ToolbarFilterActions";
import { ToolbarFilterGroups } from "./ToolbarFilterGroups";
import { ToolbarItem } from "./ToolbarItem";
import { ToolbarTextSearchFilter } from "./ToolbarTextSearchFilter";

type FilterState = {
  groupState: React.ComponentProps<typeof ToolbarFilterGroups>["filterState"];
  textSearchState: React.ComponentProps<
    typeof ToolbarTextSearchFilter
  >["filterState"];
};

function useState<K extends string, I>(
  initialGroupInclustionMap: Record<K, boolean>,
  groupMembershipMap: (i: I) => Record<K, boolean>,
  itemSearchableText: (i: I) => string,
  noSelectedGroupStrategy:
    | "all-off-display-all"
    | "all-off-display-none" = "all-off-display-all",
): {
  filterState: FilterState;
  filterParameters: (parameters: I[]) => I[];
} {
  const textSearchState = ToolbarTextSearchFilter.useState();
  const groupState = ToolbarFilterGroups.useState(initialGroupInclustionMap);

  const [groupInclusionMap] = groupState;
  const [searchedText] = textSearchState;

  const filterParameters = React.useCallback(
    (items: I[]): I[] =>
      items.filter(
        i =>
          (noSelectedGroupStrategy === "all-off-display-all"
            ? ToolbarFilterGroups.allOrIncludedGroupMembers({
                groupInclusionMap,
                groupMembershipMap: groupMembershipMap(i),
              })
            : ToolbarFilterGroups.includedGroupMembers({
                groupInclusionMap,
                groupMembershipMap: groupMembershipMap(i),
              }))
          && ToolbarTextSearchFilter.match(itemSearchableText(i), searchedText),
      ),
    [
      groupInclusionMap,
      groupMembershipMap,
      itemSearchableText,
      noSelectedGroupStrategy,
      searchedText,
    ],
  );

  return {
    filterState: {
      groupState,
      textSearchState,
    },
    filterParameters,
  };
}

export const ToolbarFilterTextGroupPair: React.FC<{
  textSearchId: string;
  groupName: string;
  filterState: ReturnType<typeof useState>["filterState"];
  actions?: Record<string, () => void>;
}> & { useState: typeof useState } = ({
  textSearchId,
  groupName,
  filterState,
  actions = {},
}) => {
  const clearAllFilters = () => {
    const [groupInclusionMap, setGroupInclusionMap] = filterState.groupState;
    setGroupInclusionMap(
      ToolbarFilterGroups.unselectAllOptions(groupInclusionMap),
    );
  };

  return (
    <ToolbarFilterAction clearAllFilters={clearAllFilters} actions={actions}>
      <>
        <ToolbarItem>
          <ToolbarTextSearchFilter
            id={textSearchId}
            name={textSearchId}
            filterState={filterState.textSearchState}
          />
        </ToolbarItem>
        <ToolbarItem>
          <ToolbarFilterGroups
            name={groupName}
            filterState={filterState.groupState}
          />
        </ToolbarItem>
      </>
    </ToolbarFilterAction>
  );
};

ToolbarFilterTextGroupPair.useState = useState;
