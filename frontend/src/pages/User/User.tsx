import { SuspenseCustom } from "~/ui";
import Inventory from "./Inventory";

export const User = () => {
  return (
    <SuspenseCustom type="spinner">
      <Inventory />
    </SuspenseCustom>
  );
};
