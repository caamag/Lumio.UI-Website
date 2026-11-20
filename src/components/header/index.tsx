import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { SiGithub, SiStorybook } from "react-icons/si";
import * as _ from "./style";
import Logo from "../../assets/logo-lumio.png";
import LogoIcon from "../../assets/logo.png";
import Cta from "../ui/Cta";
import { LINKS } from "../../global/links";

const NAV = [
  { label: "Recursos", href: "#recursos" },
  { label: "Playground", href: "#playground" },
  { label: "Instalação", href: "#instalacao" },
  { label: "Temas", href: "#temas" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    // no máximo uma atualização por frame; a barra é atualizada direto no DOM
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <_.Header $scrolled={scrolled || open}>
      <_.Inner>
        <_.Brand href="#topo" onClick={close} aria-label="Lumio.UI — início">
          <img src={LogoIcon} alt="" className="icon" />
          <img src={Logo} alt="Lumio.UI" className="word" />
        </_.Brand>

        <_.Nav aria-label="Navegação principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </_.Nav>

        <_.Actions>
          <_.IconLink
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositório no GitHub"
          >
            <SiGithub />
          </_.IconLink>
          <_.DesktopOnly>
            <Cta href={LINKS.storybook} size="sm">
              <SiStorybook />
              Ver Storybook
            </Cta>
          </_.DesktopOnly>
          <_.MenuButton
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX /> : <FiMenu />}
          </_.MenuButton>
        </_.Actions>
      </_.Inner>

      <_.Progress ref={progressRef} />

      <_.MobileMenu $open={open} aria-hidden={!open}>
        {NAV.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={close}
            style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            tabIndex={open ? 0 : -1}
          >
            {item.label}
          </a>
        ))}
        <a
          href={LINKS.npm}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          tabIndex={open ? 0 : -1}
        >
          npm <FiArrowUpRight />
        </a>
        <_.MobileCta>
          <Cta href={LINKS.storybook} size="lg">
            <SiStorybook />
            Ver Storybook
          </Cta>
        </_.MobileCta>
      </_.MobileMenu>
    </_.Header>
  );
};

export default Header;
