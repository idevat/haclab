import React from "react";
import { Form, FormGroup, SelectOption } from "@patternfly/react-core";

import { FormText, Select } from "app/view";

import { useWizard } from "./useWizard";

export const ConstraintCreateLocationConfigure: React.FC = () => {
  const {
    updateState,
    nodeNameList,
    resourceTree,
    state: { score, nodeName, resourceId },
  } = useWizard();

  const resourceIdList = resourceTree.reduce<string[]>((idList, resource) => {
    if (resource.itemType === "primitive") {
      return [...idList, resource.id];
    }

    if (resource.itemType === "group") {
      return [...idList, resource.id, ...resource.resources.map(r => r.id)];
    }

    return idList;
  }, []);
  return (
    <Form data-test="create-location-constrait" isHorizontal>
      <FormGroup
        label="Resource"
        isRequired
        fieldId="constraint-location-create-resource"
      >
        <Select
          variant="single"
          typeAheadAriaLabel="Select a resource"
          onSelect={value => updateState({ resourceId: value.toString() })}
          onClear={() => updateState({ resourceId: "" })}
          selections={resourceId}
          placeholderText="Select a resource"
        >
          {resourceIdList.map(resourceId => (
            <SelectOption key={resourceId} value={resourceId} />
          ))}
        </Select>
      </FormGroup>

      <FormGroup
        label="Node"
        isRequired
        fieldId="constraint-location-create-node"
      >
        <Select
          variant="single"
          typeAheadAriaLabel="Select a node"
          onSelect={value => updateState({ nodeName: value.toString() })}
          onClear={() => updateState({ nodeName: "" })}
          selections={nodeName}
          placeholderText="Select a node"
        >
          {nodeNameList.map(nodeName => (
            <SelectOption key={nodeName} value={nodeName} />
          ))}
        </Select>
      </FormGroup>

      <FormText
        id="constraint-score"
        label="Score"
        onChange={value => updateState({ score: value })}
        value={score}
        helperTextInvalid="Please provide a group name"
        isRequired
        data-test="score"
      />
    </Form>
  );
};
