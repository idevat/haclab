import React from "react";
import { Form, FormGroup } from "@patternfly/react-core";

import { FormRadioGroup } from "app/view";

import { useWizard } from "./useWizard";
import { ConstraintCreateOrderResourceAction } from "./ConstraintCreateOrderResourceAction";

export const ConstraintCreateOrderConfigure: React.FC = () => {
  const {
    resourceIdList,
    updateState,
    state: { resourceId, action, order, otherResourceId, otherAction },
  } = useWizard();

  return (
    <Form data-test="create-order-constrait">
      <ConstraintCreateOrderResourceAction
        id="constraint-order-resource"
        resource={{
          onChange: value => updateState({ resourceId: value }),
          value: resourceId,
          list: resourceIdList.filter(r => r !== otherResourceId),
        }}
        action={{
          onChange: value => updateState({ action: value }),
          value: action,
        }}
      />
      <FormGroup
        label="Order"
        isRequired
        fieldId="constraint-order-create-action"
      >
        <FormRadioGroup
          id="constraint-order-action"
          options={["after", "before"]}
          selected={order}
          onChange={value => updateState({ order: value })}
        />
      </FormGroup>
      <ConstraintCreateOrderResourceAction
        id="constraint-order-other-resource"
        resource={{
          onChange: value => updateState({ otherResourceId: value }),
          value: otherResourceId,
          list: resourceIdList.filter(r => r !== resourceId),
        }}
        action={{
          onChange: value => updateState({ otherAction: value }),
          value: otherAction,
        }}
      />
    </Form>
  );
};
