import { Suspense } from "react";
import { SpinnerFallback } from "./components/SpinnerFallback";

interface Props {
  children: React.ReactNode;
  type: "spinner";
}
export const SuspenseCustom: React.FC<Props> = (props) => {
  let fallback: React.ReactNode;
  if (props.type === "spinner") fallback = <SpinnerFallback />;

  return <Suspense fallback={fallback}>{props.children}</Suspense>;
};
