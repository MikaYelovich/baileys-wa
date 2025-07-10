/**
 * Memeriksa apakah sebuah string adalah URL yang valid.
 * Regex ini mencakup http, https, dan domain dengan atau tanpa www.
 * @param {string} text String yang akan divalidasi.
 * @returns {boolean} `true` jika string adalah URL yang valid, selain itu `false`.
 * @example
 * isURL('https://google.com'); // true
 * isURL('http://www.example.co.id/path'); // true
 * isURL('bukan url'); // false
 */
function isURL(text) {
  if (typeof text !== "string" || text.length < 1) return false;
  // Regex untuk URL yang cukup komprehensif
  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protokol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // nama domain
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // atau IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port dan path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return urlRegex.test(text);
}

/**
 * Memeriksa apakah sebuah string adalah format email yang valid.
 * @param {string} email String email yang akan divalidasi.
 * @returns {boolean} `true` jika format email valid.
 * @example
 * isEmail('test@example.com'); // true
 * isEmail('test.user+alias@gmail.co.id'); // true
 * isEmail('example.com'); // false
 */
function isEmail(email) {
  if (typeof email !== "string") return false;
  // Regex sederhana untuk validasi format email
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

/**
 * Memeriksa apakah sebuah string adalah nomor telepon Indonesia yang valid.
 * Mencakup format seperti 08..., 628..., dan +628...
 * @param {string} phone String nomor telepon yang akan divalidasi.
 * @returns {boolean} `true` jika format nomor telepon valid.
 * @example
 * isPhoneNumber('081234567890'); // true
 * isPhoneNumber('628123456789'); // true
 * isPhoneNumber('+6281234567890'); // true
 * isPhoneNumber('123'); // false
 */
function isPhoneNumber(phone) {
  if (typeof phone !== "string") return false;
  // Regex untuk nomor telepon Indonesia
  const phoneRegex = /^(?:\+?62|0)8[1-9][0-9]{7,12}$/;
  return phoneRegex.test(phone);
}

/**
 * Memeriksa apakah input adalah angka (baik string maupun number).
 * @param {string | number} value Nilai yang akan divalidasi.
 * @returns {boolean} `true` jika nilai tersebut adalah angka.
 * @example
 * isNumber(123); // true
 * isNumber('456'); // true
 * isNumber('123a'); // false
 */
function isNumber(value) {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(Number(value));
}

// Ekspor semua fungsi validator
module.exports = {
  isURL,
  isEmail,
  isPhoneNumber,
  isNumber,
};
