import React from "react";
import { Alert, Text, TextContent } from "@patternfly/react-core";

import { api } from "app/backend";

const severityToAlertVariant = (
  severity: api.types.lib.Report["severity"],
): React.ComponentProps<typeof Alert>["variant"] => {
  switch (severity.level) {
    case "ERROR":
      return "danger";
    case "WARNING":
      return "warning";
    default:
      return "info";
  }
};

export const WizardLibReports: React.FC<{
  reports: api.types.lib.Report[];
}> = ({ reports }) => {
  if (reports.length === 0) {
    return null;
  }
  return (
    <>
      <TextContent>
        <Text component="h3">Messages</Text>
      </TextContent>
      <>
        {reports.map((report, i) => (
          /* eslint-disable react/no-array-index-key */
          <Alert
            key={i}
            variant={severityToAlertVariant(report.severity)}
            isInline
            title={`${report.message.message}${
              report.severity.force_code !== null ? " (can be forced)" : ""
            }`}
          />
        ))}
      </>
    </>
  );
};
