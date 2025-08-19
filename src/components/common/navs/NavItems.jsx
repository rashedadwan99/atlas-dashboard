import { Nav, NavDropdown, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import { useSelector } from "react-redux";
import { routes } from "../../../routes/routes";
import { usePagesLinks } from "../../../hooks/usePagesLinks";
import "./nav-items.css";
function NavItems({ isFooter = false, setOpenMenu }) {
  const links = usePagesLinks();
  const navigate = useNavigate();
  const isArabic = useSelector((state) => state.language.isArabic);
  const handleClickNavLink = (n) => {
    if (n.href2) {
      navigate(routes.aboutusRoute + n.href2, { behavior: "smooth" });
    }
    if (n.href) {
      return window.open(n.href, "_blank");
    }
    if (n.path) {
      navigate(n.path, { behavior: "smooth" });
    }
    if (n.onClick) return n.onClick();
    if (!n.href2)
      window.scrollTo({ top: 0, behavior: isFooter ? "smooth" : "auto" });
    if (setOpenMenu) setOpenMenu(false);
  };

  return links.map((n, i) => {
    return (
      // <AosContainer data-aos="zoom-in">
      <Nav style={{ position: "relative" }} key={i}>
        {n.dropDownMenu ? (
          <>
            <NavDropdown
              title={n.label}
              id="basic-nav-dropdown"
              className={isArabic ? "ar" : ""}
            >
              <DropDownMenu
                links={n.dropDownMenu}
                handleClickNavLink={handleClickNavLink}
              />
            </NavDropdown>
          </>
        ) : (
          <NavLink
            onClick={() => !n.href && handleClickNavLink(n)}
            href={n.href && n.href}
            target="_blank"
            active={
              (window.location.pathname === n.path ||
                window.location.pathname === n.path2) &&
              !isFooter
            }
          >
            {n.label}
          </NavLink>
        )}
      </Nav>
      // </AosContainer>
    );
  });
}

export default NavItems;
