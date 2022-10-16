import { IHeaderValues } from "../../../../typings/headerValues";
import OPHeaderItem from "../../atoms/headeritem/OPHeaderItem";
import { Images } from "../../../../constants/Images";

import classes from "./OPHeader.module.scss";

const HEADER_VALUES: IHeaderValues[] = [
  {
    text: "Tipovi volonterskih akcija",
    link: "/volunteer-action-type",
  },
  {
    text: "Volonterske akcije",
    link: "/volunteer-action",
  },
  {
    text: "Donacije",
    link: "/donation",
  },
  {
    text: "Novosti",
    link: "/news",
  },
  {
    text: "Kontakti",
    link: "/contact",
  },
  {
    text: "O nama",
    link: "/about-us",
  },
  {
    text: "Bankovni račun",
    link: "/bank-account",
  },
];

const OPHeader = () => {
  return (
    <header className={classes["header-wrapper"]}>
      <div className={classes["header-content"]}>
        <div className={classes["header-logo-wrapper"]}>
          <img src={Images.HeaderLogo} alt="Logo" width="68" height="68" />
        </div>
        {HEADER_VALUES.map((value, index) => (
          <OPHeaderItem key={index} text={value.text} link={value.link} />
        ))}
        <div className={classes["header-logout-wrapper"]}>
          <button>ODJAVA</button>
        </div>
      </div>
    </header>
  );
};

export default OPHeader;
