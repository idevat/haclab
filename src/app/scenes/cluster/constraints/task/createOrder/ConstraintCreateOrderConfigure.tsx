import React from "react";
import { Form, SelectOption } from "@patternfly/react-core";
import { ArrowDownIcon, ArrowUpIcon } from "@patternfly/react-icons";

import { FormRadioGroup, Select } from "app/view";

import { useWizard } from "./useWizard";

export const ConstraintCreateOrderConfigure: React.FC = () => {
  const {
    resourceIdList,
    updateState,
    swapResources,
    state: { firstResourceId, firstAction, thenResourceId, thenAction },
  } = useWizard();

  return (
    <Form data-test="create-order-constrait" isHorizontal>
      <table>
        <tbody>
          <tr>
            <th>First resource</th>
            <td>
              <Select
                variant="single"
                onSelect={value => updateState({ firstResourceId: value })}
                selections={firstResourceId}
                placeholderText="Select resource"
              >
                {resourceIdList
                  .filter(r => r !== thenResourceId)
                  .map(o => (
                    <SelectOption key={o} value={o} />
                  ))}
              </Select>
            </td>
            <td>
              <FormRadioGroup
                id={"constraint-order-first-resource-action"}
                options={["start", "stop", "promote", "demote"]}
                selected={firstAction}
                onChange={value => updateState({ firstAction: value })}
              />
            </td>
            <td>
              <ArrowDownIcon onClick={swapResources} />
            </td>
          </tr>
          <tr>
            <th>Next resource</th>
            <td>
              <Select
                variant="single"
                onSelect={value => updateState({ thenResourceId: value })}
                selections={thenResourceId}
                placeholderText="Select resource"
              >
                {resourceIdList
                  .filter(r => r !== firstResourceId)
                  .map(o => (
                    <SelectOption key={o} value={o} />
                  ))}
              </Select>
            </td>
            <td>
              <FormRadioGroup
                id={"constraint-order-then-resource-action"}
                options={["start", "stop", "promote", "demote"]}
                selected={thenAction}
                onChange={value => updateState({ thenAction: value })}
              />
            </td>
            <td>
              <ArrowUpIcon onClick={swapResources} />
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  );
};
