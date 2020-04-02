import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

import { Action } from "app/actions";
import { selectors, types } from "app/store";

const severityToVariant = (severity: types.Notification["severity"]) => {
  switch (severity) {
    case "SUCCESS":
      return "success";
    case "ERROR":
      return "danger";
    default:
      return "info";
  }
};

export const NotificationContainer = () => {
  const notifications = useSelector(selectors.getNotifications);
  const dispatch = useDispatch();
  return (
    <ul id="notifications">
      {notifications.reverse().map(({ id, severity, message }) => (
        <li className="notification-item" key={id}>
          <Alert
            variant={severityToVariant(severity)}
            action={
              <AlertActionCloseButton
                onClose={() =>
                  dispatch<Action>({
                    type: "NOTIFICATION.DESTROY",
                    payload: { id },
                  })
                }
              />
            }
            title={message}
          />
        </li>
      ))}
    </ul>
  );
};
