import React from "react";
import { Checkbox, Flex, FlexItem, FormGroup } from "@patternfly/react-core";

import { FormSelectOrText } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateSettingsGroup: React.FC = () => {
  const {
    state: { useGroup, group, clone, showValidationErrors },
    updateState,
    groupList,
  } = useWizard();
  const newGroupValidated =
    showValidationErrors && useGroup === "new" && group.length === 0
      ? "error"
      : "default";
  return (
    <Flex>
      <FlexItem>
        <Checkbox
          label="Use group"
          aria-label="Use group"
          id="settings-use-group"
          isChecked={useGroup !== "no"}
          isDisabled={clone}
          onChange={(checked: boolean) => {
            let value: typeof useGroup = "no";
            if (checked) {
              value =
                group.length === 0 || groupList.includes(group)
                  ? "existing"
                  : "new";
            }
            updateState({
              useGroup: value,
              group: value === "existing" ? groupList[0] : "",
            });
          }}
        />
      </FlexItem>
      {useGroup !== "no" && (
        <FlexItem>
          <FormGroup fieldId="settings-group-existing">
            <FormSelectOrText
              id="settings-group"
              checked={useGroup === "existing" ? "select" : "text"}
              onChange={checked =>
                updateState({
                  useGroup: checked === "select" ? "existing" : "new",
                  group: checked === "select" ? groupList[0] : "",
                })
              }
              select={{
                label: "Select existing group",
                selections: groupList.includes(group) ? group : "",
                isDisabled: !useGroup,
                optionsValues: groupList,
                onSelect: value => updateState({ group: value.toString() }),
              }}
              text={{
                label: "Create new group",
                value: group,
                onChange: value => updateState({ group: value }),
                helperTextInvalid: "Please provide a name for the new group",
                validated: newGroupValidated,
              }}
            />
          </FormGroup>
        </FlexItem>
      )}
    </Flex>
  );
};
