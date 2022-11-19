interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type: "primary" | "secondary" | "warning";
  size: "normal" | "small";
}

export const Button: React.FC<Props> = (props) => {
  let classes: string = "";

  if (props.type === "primary") classes = "text-slate-100 bg-blue-700";
  if (props.type === "secondary") classes = "bg-slate-400";
  if (props.type === "warning") classes = "text-slate-100 bg-red-700";

  if (props.disabled) classes += " cursor-not-allowed";

  return (
    <button
      className={`px-5 py-1 text-center rounded-sm border-black border-[1px] ${classes}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
