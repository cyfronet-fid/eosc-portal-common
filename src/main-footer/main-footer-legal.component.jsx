import { environment } from "../../env/env";
import EoscMainFooterBtn from "./main-footer-btn.component"; // zmień na default import
import { isBtnActive } from "../main-header/main-header.utils";

export default function EoscMainFooterLegalBar() {
  return (
    <div>
      <ul className="copyright-menu">
        {environment.mainFooterConfig.legal.map((config) => (
          <EoscMainFooterBtn
            {...{
              ...config,
              isActive: isBtnActive(
                environment.mainFooterConfig.legal.map((btn) => btn.url),
                config.url
              )
            }}
          />
        ))}
      </ul>
      <div className="ue-logo d-flex">
        <a className="logo-two d-block" href="#">
          &nbsp;
        </a>
        <div className="ueText">EOSC Beyond is funded by the European Union<br></br>
         Grant Agreement Number 101131875
        </div>
      </div>
    </div>
  );
}