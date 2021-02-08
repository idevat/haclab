import React from "react";
import { Flex, FlexItem, Form, FormGroup, Radio } from "@patternfly/react-core";

import { FormSelectOrText, FormText } from "app/view";

import { useWizard } from "./useWizard";

export const ConstraintCreateLocationConfigure: React.FC = () => {
  const {
    updateState,
    nodeNameList,
    resourceIdList,
    state: {
      resourceSpecification,
      resourceId,
      resourcePattern,
      locationSpecification,
      nodeName,
      rule,
      preference,
      score,
    },
  } = useWizard();

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
        <FormSelectOrText
          id="constraint-location-create-location"
          checked={locationSpecification === "node" ? "select" : "text"}
          onChange={checked =>
            updateState({
              locationSpecification: checked === "select" ? "node" : "rule",
            })
          }
          select={{
            label: "Select a node",
            selections: nodeName,
            optionsValues: nodeNameList,
            onSelect: value => updateState({ nodeName: value.toString() }),
          }}
          text={{
            label: "Type rule",
            value: rule,
            onChange: value => updateState({ rule: value }),
            helperTextInvalid: "Please provide rule",
            "data-test": "rule",
          }}
        />
      </FormGroup>

      <FormGroup
        label="Preference"
        isRequired
        fieldId="constraint-location-create-preference"
      >
        <Flex>
          <FlexItem>
            <Radio
              isChecked={preference === "prefer"}
              name="preference-prefer"
              onChange={isChecked =>
                updateState({ preference: isChecked ? "prefer" : "avoid" })
              }
              label="Prefer"
              id="preference-prefer"
            />
          </FlexItem>
          <FlexItem>
            <Radio
              isChecked={preference === "avoid"}
              name="preference-avoid"
              onChange={isChecked =>
                updateState({ preference: isChecked ? "avoid" : "prefer" })
              }
              label="Avoid"
              id="preference-avoid"
            />
          </FlexItem>
        </Flex>
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
