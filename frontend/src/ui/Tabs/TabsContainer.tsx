interface Props {
  children: React.ReactNode;
}

export const TabsContainer: React.FC<Props> = (props) => {
  return (
    <ul className="inline-flex flex-wrap rounded-t-md -mb-px text-sm font-medium text-center bg-stone-900 text-gray-400">
      {props.children}
    </ul>
  );
};
