import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { NavbarLink } from "./NavbarLink";

export const Navbar: React.FC = () => {
  const auth = useSnapshot(authStore);

  return (
    <nav className="flex justify-between">
      <ul className="inline-flex gap-[2px]">
        <NavbarLink to="/">Home</NavbarLink>
      </ul>
      <div className="inline-flex">{auth.accessToken ? <Logout /> : <Login />}</div>
    </nav>
  );
};
