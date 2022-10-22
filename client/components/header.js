import React from "react";
import Link from "next/link";

export const Header = ({ user }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">MiMenu</a>
      </Link>
    </nav>
  );
};
