interface Props {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<Props> = (props) => {
  if (props.active)
    return (
      <li className="mr-2">
        <div
          className="cursor-default inline-flex p-4 text-gray-300 rounded-t-lg border-b-2 border-slate-300 hover:text-gray-300 hover:border-gray-300"
          aria-current="page"
        >
          {props.children}
        </div>
      </li>
    );
  return (
    <li className="mr-2">
      <div
        className="cursor-pointer inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300"
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </li>
  );
};
