// useDate.js
import moment from "moment-timezone";
import "moment/locale/ar";
import { useSelector } from "react-redux";

export const useDate = () => {
  const isArabic = useSelector((state) => state.language.isArabic);
  moment.locale(isArabic ? "ar" : "en");

  // ✅ return a function to format any date
  return (date) => moment(date).format("MMMM D, YYYY");
};
