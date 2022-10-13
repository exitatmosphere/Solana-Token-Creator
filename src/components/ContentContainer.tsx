import { FC } from "react";
import Link from "next/link";
export const ContentContainer: FC = (props) => {
  return (
    <div className="drawer h-52 flex-1">
      {/* <div className="h-screen drawer drawer-mobile w-full"> */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle grow" />
      <div className="drawer-content  items-center">{props.children}</div>

      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu w-80 overflow-y-auto bg-base-100 p-4">
          <li>
            <h1>Menu</h1>
          </li>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/create">
              <a>Create token</a>
            </Link>
          </li>
          <li>
            <Link href="/upload">
              <a>Upload metadata</a>
            </Link>
          </li>
          <li>
            <Link href="/misc">
              <a>Miscellaneous</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
