import React from "react";
import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { types } from "app/store";
import { SelectionIndicatorInGroup, useGroupDetailViewContext } from "app/view";

import { FenceDeviceListCellStatus } from "./FenceDeviceListCellStatus";
import { FenceDeviceListCellName } from "./FenceDeviceListCellName";
import { FenceDeviceListCellType } from "./FenceDeviceListCellType";

export const FenceDeviceListItem = ({
  fenceDevice,
}: {
  fenceDevice: types.cluster.FenceDevice;
}) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={fenceDevice.id}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <FenceDeviceListCellName fenceDevice={fenceDevice} />
              </DataListCell>
              <DataListCell>
                <FenceDeviceListCellType fenceDevice={fenceDevice} />
              </DataListCell>
            </>
          }
        />
        <FenceDeviceListCellStatus fenceDevice={fenceDevice} />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={fenceDevice.id === selectedItemUrlName}
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
