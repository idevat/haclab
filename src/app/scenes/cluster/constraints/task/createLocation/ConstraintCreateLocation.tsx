import React from "react";
import { Button, Form, Modal, SelectOption } from "@patternfly/react-core";

import { FormText, Select } from "app/view";

import { useWizard } from "./useWizard";

export const ConstraintCreateLocation: React.FC = () => {
  const {
    close,
    updateState,
    nodeNameList,
    state: { score, node },
  } = useWizard();

  const [nodeSearch, setNodeSearch] = React.useState("");
  const actions = [
    <Button
      key="CreateLocation"
      variant="primary"
      onClick={() => {
        console.log("Create Location");
      }}
    >
      Create group
    </Button>,
    <Button key="Cancel" variant="link" onClick={close}>
      Cancel
    </Button>,
  ];
  return (
    <Modal
      variant="medium"
      title="New location"
      isOpen
      onClose={close}
      actions={actions}
      high={400}
    >
      <Form data-test="create-group">
        <FormText
          id="constraint-score"
          label="Score"
          onChange={value => updateState({ score: value })}
          value={score}
          helperTextInvalid="Please provide a group name"
          isRequired
          data-test="score"
        />

        <Select
          variant="single"
          typeAheadAriaLabel="Select a state"
          onSelect={value => updateState({ node: value.toString() })}
          onClear={() => updateState({ node: "" })}
          onFilter={setNodeSearch}
          selections={node}
          placeholderText="Select a state"
        >
          {nodeNameList
            .filter(nodeName => nodeName.includes(nodeSearch))
            .map(nodeName => (
              <SelectOption key={nodeName} value={nodeName} />
            ))}
        </Select>
      </Form>
    </Modal>
  );
};
