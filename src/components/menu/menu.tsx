import { useEffect, useRef, useState } from "react";
import Link from "../Link";
import "./menu.css";

const desktopQuery = "(min-width: 992px)";

function Menu() {
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState<number | "auto">(0);
  const [desktop, setDesktop] = useState(
    () => window.matchMedia(desktopQuery).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const onChange = () => {
      setDesktop(media.matches);
      if (media.matches) {
        setOpen(false);
        setHeight(0);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const collapse = () => {
    const panel = panelRef.current;
    if (panel && !desktop) {
      setHeight(panel.getBoundingClientRect().height);
      requestAnimationFrame(() => setHeight(0));
    } else {
      setHeight(0);
    }
    setOpen(false);
  };

  const expand = () => {
    setOpen(true);
    setHeight(linksRef.current?.scrollHeight ?? 0);
  };

  const toggle = () => {
    if (open) collapse();
    else expand();
  };

  return (
    <div id="menuContainer">
      <div id="logo">
        <Link to="/">
          <div className="logonapis">
            Parafia <br />
            <span className="logobigger">Świętej Anny</span>
            <br />w Tarnowskich Górach
          </div>
        </Link>
      </div>
      <div id="menu">
        <nav className="menu" aria-label="Nawigacja">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-label="Menu"
            onClick={toggle}
          >
            <span className="menu-toggle-icon" />
          </button>
          <div
            className="menu-panel"
            ref={panelRef}
            style={desktop ? undefined : { height }}
            inert={!desktop && !open ? true : undefined}
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              if (event.propertyName !== "height") return;
              if (open) setHeight("auto");
            }}
          >
            <div className="menu-links" ref={linksRef}>
              <Link className="menu-link" to="/" onClick={collapse}>
                Aktualności
              </Link>
              <Link className="menu-link" to="/nabozenstwa" onClick={collapse}>
                Porządek nabożeństw
              </Link>
              <Link className="menu-link" to="/historia" onClick={collapse}>
                Historia kościoła
              </Link>
              <Link className="menu-link last" to="/kontakt" onClick={collapse}>
                Kontakt
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
