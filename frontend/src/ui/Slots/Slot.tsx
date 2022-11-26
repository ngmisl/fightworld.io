interface Props {
  children: React.ReactNode;
}

export const Slot: React.FC<Props> = (props) => {
  return <div className="w-16 h-16 bg-amber-500 p-2 border-amber-800 border-2 rounded-sm">{props.children}</div>;
};
