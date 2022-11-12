interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<Props> = (props) => {
  return (
    <button
      className="text-center text-s px-3 bg-slate-200 shadow-sm border-solid"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
