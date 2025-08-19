import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

function DropDownMenu({ links, handleClickNavLink }) {
  const isArabic = useSelector((state) => state.language.isArabic);
  return links.map((l) => {
    return (
      <NavDropdown.Item onClick={() => handleClickNavLink(l)} key={l.id}>
        {isArabic ? l.title_ar : l.title}
      </NavDropdown.Item>
    );
  });
}

export default DropDownMenu;
