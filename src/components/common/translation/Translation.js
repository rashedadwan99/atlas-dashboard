import i18next from "i18next";

function Translation({ object, path }) {
  return object[`${path}_${i18next.language}`];
}

export default Translation;
