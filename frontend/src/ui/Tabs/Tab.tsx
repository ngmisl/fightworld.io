interface Props {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<Props> = (props) => {
  if (props.active)
    return (
      <li>
        <div
          className="cursor-default inline-flex p-4 text-gray-300 border-t-2 border-blue-500 hover:text-gray-300"
          aria-current="page"
        >
          {props.children}
        </div>
      </li>
    );
  return (
    <li>
      <div
        className="cursor-pointer bg-stone-700 inline-flex p-4 border-t-2 border-transparent hover:text-gray-300 hover:border-blue-500"
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </li>
  );
};
