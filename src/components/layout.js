import React from "react";
import { Link } from "gatsby";
import "../styles/layout.css";

const Header = () => (
  <header>
    <Link to="/">三次元日誌(gatsby v5)</Link>
    <Link to="/tags/">tags</Link>
  </header>
);

const Footer = () => <footer> © {new Date().getFullYear()} ousttrue</footer>;

const Layout = ({ children }) => (
  <div>
    <Header />

    <div className="layout">
      <main>{children}</main>
    </div>

    <Footer />
  </div>
);

export default Layout;
