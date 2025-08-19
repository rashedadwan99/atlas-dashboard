import _ from "lodash";

export const searchByPath = (array, path, keyword) => {
  if (!Array.isArray(array) || !path) return [];
  if (!keyword) return array;
  return _.filter(array, (item) => {
    const value = _.get(item, path, ""); // احصل على القيمة من المسار
    return _.toLower(value).includes(_.toLower(keyword)); // مقارنة غير حساسة لحالة الأحرف
  });
};
