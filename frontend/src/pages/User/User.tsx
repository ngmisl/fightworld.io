import { SuspenseCustom } from "~/ui";
import Inventory from "./components/Inventory";

export const User = () => {
  return (
    <SuspenseCustom type="spinner">
      <Inventory />
    </SuspenseCustom>
  );
};
