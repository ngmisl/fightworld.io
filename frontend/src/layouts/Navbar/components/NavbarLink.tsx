import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
}
export const NavbarLink: React.FC<Props> = (props) => {
  return (
    <li>
      <Link
        to={props.to}
        className="px-5 py-1 text-white bg-blue-700 inline-block rounded-sm border-solid border-black border-[1px]"
      >
        {props.children}
      </Link>
    </li>
  );
};
