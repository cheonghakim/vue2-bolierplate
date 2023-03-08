/**
 * http get 쿼리 스트링 생성
 * @param obj
 * @returns {string}
 */
export const queryString = (obj, emptyStr = false) => {
  let query = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          query.push(`${key}=${encodeURIComponent(v)}`);
        });
      } else {
        query.push(`${key}=${encodeURIComponent(value)}`);
      }
    } else if (value !== undefined && value !== null && emptyStr) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          query.push(`${key}=${encodeURIComponent(v)}`);
        });
      } else {
        query.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
  });
  return `?${query.join("&")}`;
};
