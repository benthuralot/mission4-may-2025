// components/Header.jsx
import "../styles/HeaderFooter.css";

function Header() {
  return (
    <header className="turners-header">
      <img
        src="https://content.tgstatic.co.nz/webassets/contentassets/3e15c8546917474ca0a150b18e9fd64e/turnerscars_logo_1line_horz_true-rgb-desktop.png"
        alt="Turners Logo"
        className="turners-logo"
      />
      <span className="turners-title">Turners Insurance Assistant</span>
    </header>
  );
}

export default Header;
