interface Props {
  children: React.ReactNode;
}

export const SlotsContainer: React.FC<Props> = (props) => {
  return (
    <div className="bg-stone-900 min-h-[30rem] p-2 border-black rounded-sm">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-1">{props.children}</div>
    </div>
  );
};
