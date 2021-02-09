import { LocationCreateActions } from "./locationCreate";
import { OrderCreateActions } from "./orderCreate";

// prettier-ignore
export type ConstraintAction = (
  & LocationCreateActions
  & OrderCreateActions
);
