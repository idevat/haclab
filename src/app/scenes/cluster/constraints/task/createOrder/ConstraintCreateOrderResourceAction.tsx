import {
  Flex,
  FlexItem,
  FormGroup,
  SelectOption,
} from "@patternfly/react-core";
import React from "react";

import { FormRadioGroup, Select } from "app/view";

type Action = "start" | "stop" | "promote" | "demote";
export const ConstraintCreateOrderResourceAction: React.FC<{
  id: string;
  resource: {
    onChange: (value: string) => void;
    value: string;
    list: string[];
  };
  action: {
    onChange: (value: Action) => void;
    value: Action;
  };
}> = ({ id, resource, action }) => {
  return (
    <FormGroup label="Resource action" isRequired fieldId={id}>
      <Flex>
        <FlexItem>
          <Select
            variant="single"
            onSelect={value => resource.onChange(value.toString())}
            selections={resource.value}
            placeholderText="Select resource"
          >
            {resource.list.map(o => (
              <SelectOption key={o} value={o} />
            ))}
          </Select>
        </FlexItem>
        <FlexItem>
          <FormRadioGroup
            id={`${id}-action`}
            options={["start", "stop", "promote", "demote"]}
            selected={action.value}
            onChange={action.onChange}
          />
        </FlexItem>
      </Flex>
    </FormGroup>
  );
};
