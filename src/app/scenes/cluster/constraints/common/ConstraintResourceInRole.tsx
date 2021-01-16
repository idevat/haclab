import React from "react";

export const ConstraintResourceInRole: React.FC<{
  role: string | undefined;
}> = ({ role }) => {
  return (
    <>
      {" in role "}
      <strong>{role || "Started"}</strong>
    </>
  );
};
