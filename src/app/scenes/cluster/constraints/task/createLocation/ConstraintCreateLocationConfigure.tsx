import React from "react";
import { Form, FormGroup, SelectOption } from "@patternfly/react-core";

import { FormSelectOrText, FormText, Select } from "app/view";

import { useWizard } from "./useWizard";

export const ConstraintCreateLocationConfigure: React.FC = () => {
  const {
    updateState,
    nodeNameList,
    resourceTree,
    state: {
      resourceSpecification,
      resourceId,
      resourcePattern,
      nodeName,
      score,
    },
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
    <Form data-test="create-location-constrait">
      <FormGroup
        label="Resource"
        isRequired
        fieldId="constraint-location-create-resource"
      >
        <FormSelectOrText
          id="constraint-location-create-resource"
          checked={resourceSpecification === "resource" ? "select" : "text"}
          onChange={checked =>
            updateState({
              resourceSpecification:
                checked === "select" ? "resource" : "pattern",
            })
          }
          select={{
            label: "Select a resource",
            selections: resourceId,
            optionsValues: resourceIdList,
            onSelect: value => updateState({ resourceId: value.toString() }),
          }}
          text={{
            label: "Type resource pattern",
            value: resourcePattern,
            onChange: value => updateState({ resourcePattern: value }),
            helperTextInvalid: "Please provide resource pattern",
            "data-test": "resource-pattern",
          }}
        />
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
        helperTextInvalid="Please provide score"
        isRequired
        data-test="score"
      />
    </Form>
  );
};
