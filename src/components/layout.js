import React from "react";
// import Paper from '@material-ui/core/Paper'

const Header = () => <header>SITE TITLE</header>;
const Footer = () => <footer>Copyright</footer>;
const Layout = ({ children }) => (
  <div>
    <Header />

    {children}

    <Footer />
  </div>
);
export default Layout;
