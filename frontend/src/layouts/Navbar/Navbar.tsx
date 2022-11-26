import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NavbarLink } from "./components/NavbarLink";

export const Navbar: React.FC = () => {
  const auth = useSnapshot(authStore);

  return (
    <nav className="pb-3 flex justify-between">
      <ul className="inline-flex gap-[2px]">
        <NavbarLink to="/">Home</NavbarLink>
      </ul>
      <div className="inline-flex">{auth.accessToken ? <Logout /> : <Login />}</div>
    </nav>
  );
};
