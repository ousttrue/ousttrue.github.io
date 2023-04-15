import React from "react";
import { Link } from "gatsby";
import "../styles/layout.css";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">三次元日誌(gatsby v5)</Link>
        </li>
        <li>
          <Link to="/about/">about</Link>
        </li>
        <li>
          <Link to="/tags/">tags</Link>
        </li>
        <li>
          <Link to="/books/">books</Link>
        </li>
      </ul>
    </nav>
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
