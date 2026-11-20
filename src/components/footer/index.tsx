import { SiGithub, SiNpm, SiStorybook } from "react-icons/si";
import * as _ from "./style";
import Logo from "../../assets/logo-lumio.png";
import LogoIcon from "../../assets/logo.png";
import { LINKS, PACKAGE_VERSION } from "../../global/links";

const Footer = () => {
  return (
    <_.Footer>
      <_.Inner>
        <_.Brand>
          <_.Logo>
            <img src={LogoIcon} alt="" className="icon" />
            <img src={Logo} alt="Lumio.UI" className="word" />
          </_.Logo>
          <p>
            Biblioteca de componentes React documentada no Storybook. Instale,
            importe e construa interfaces consistentes em minutos.
          </p>
          <_.Socials>
            <a href={LINKS.storybook} target="_blank" rel="noopener noreferrer" aria-label="Storybook">
              <SiStorybook />
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <SiGithub />
            </a>
            <a href={LINKS.npm} target="_blank" rel="noopener noreferrer" aria-label="npm">
              <SiNpm />
            </a>
          </_.Socials>
        </_.Brand>

        <_.Columns>
          <div>
            <h4>Produto</h4>
            <a href={LINKS.storybook} target="_blank" rel="noopener noreferrer">
              Storybook
            </a>
            <a href="#playground">Playground</a>
            <a href="#instalacao">Instalação</a>
            <a href="#temas">Temas</a>
          </div>
          <div>
            <h4>Comunidade</h4>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LINKS.npm} target="_blank" rel="noopener noreferrer">
              npm
            </a>
            <a href={LINKS.issues} target="_blank" rel="noopener noreferrer">
              Reportar um problema
            </a>
          </div>
        </_.Columns>
      </_.Inner>

      <_.Bottom>
        <span>© {new Date().getFullYear()} Lumio.UI · v{PACKAGE_VERSION}</span>
        <span>Feito com 💡 por Caio</span>
      </_.Bottom>
    </_.Footer>
  );
};

export default Footer;
