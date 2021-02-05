import React from "react";
import { Select as PfSelect, SelectOptionObject } from "@patternfly/react-core";

type SelectProps = React.ComponentProps<typeof PfSelect>;
type Props = Omit<SelectProps, "isOpen" | "onToggle" | "onSelect" | "onFilter">;

export const Select: React.FC<
  Props & {
    onSelect: (value: string) => void;
    onFilter?: (value: string) => void;
  }
> = (props) => {
  const { onSelect, onFilter, ...restProps } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const select = React.useCallback(
    (
      _event: React.MouseEvent | React.ChangeEvent,
      value: string | SelectOptionObject,
    ) => {
      onSelect(value.toString());
      setIsOpen(false);
    },
    [onSelect],
  );

  const filter = onFilter
    ? (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilter(event.target.value);
        return (null as unknown) as React.ReactElement[];
      }
    : null;

  const pfProps = {
    ...restProps,
    ...(filter !== null ? { onFilter: filter } : {}),
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <PfSelect
      onToggle={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      onSelect={select}
      {...pfProps}
    />
  );
};
