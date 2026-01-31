import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/uk";
import "dayjs/locale/en";

dayjs.extend(customParseFormat);
dayjs.locale("en");

export const setDayjsLocale = (locale: string) => {
  dayjs.locale(locale);
};

export default dayjs;
