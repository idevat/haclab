import React from "react";
import { Radio, SelectOption, Stack, StackItem } from "@patternfly/react-core";

import { FormText } from "./FormText";
import { Select } from "./Select";

type Checks = "select" | "text";
type SelectProps = React.ComponentProps<typeof Select>;
type TextProps = React.ComponentProps<typeof FormText>;
export const FormSelectOrText: React.FC<{
  id: string;
  checked: Checks;
  onChange: (checked: Checks) => void;
  select: {
    label: string;
    onSelect: (value: string) => void;
    selections: SelectProps["selections"];
    isDisabled?: boolean;
    placeholderText?: string;
    "data-test"?: string;
  } & (
    | {
        options: SelectProps["children"];
      }
    | {
        optionsValues: string[];
      }
  );
  text: {
    label: string;
    value: TextProps["value"];
    onChange: (value: string) => void;
    helperTextInvalid: TextProps["helperTextInvalid"];
    validated?: TextProps["validated"];
    "data-test"?: string;
  };
}> = ({ id, checked, onChange, select, text }) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <Radio
          isChecked={checked === "select"}
          name={`${id}-name-select`}
          onChange={isChecked => onChange(isChecked ? "select" : "text")}
          label={select.label}
          id={`${id}-choice-select`}
        />
        {checked === "select" && (
          <Select
            variant="single"
            placeholderText={select.placeholderText ?? ""}
            onSelect={select.onSelect}
            selections={select.selections}
            isDisabled={select.isDisabled}
            data-test={select["data-test"]}
          >
            {"options" in select
              ? select.options
              : select.optionsValues.map(o => (
                  <SelectOption key={o} value={o} />
                ))}
          </Select>
        )}
      </StackItem>
      <StackItem>
        <Radio
          isChecked={checked === "text"}
          name={`${id}-name-text`}
          onChange={isChecked => onChange(isChecked ? "text" : "select")}
          label={text.label}
          id={`${id}-choice-text`}
        />
        {checked === "text" && (
          <FormText
            id="new-group-name"
            value={text.value}
            isRequired
            onChange={text.onChange}
            helperTextInvalid={text.helperTextInvalid}
            validated={text.validated}
            data-test={text["data-test"]}
          />
        )}
      </StackItem>
    </Stack>
  );
};
