/**
 * Memeriksa apakah sebuah string adalah URL yang valid.
 * @param text String yang akan divalidasi.
 * @returns `true` jika string adalah URL yang valid, selain itu `false`.
 * @example
 * isURL('https://google.com'); // true
 */
export declare function isURL(text: string): boolean;

/**
 * Memeriksa apakah sebuah string adalah format email yang valid.
 * @param email String email yang akan divalidasi.
 * @returns `true` jika format email valid.
 * @example
 * isEmail('test@example.com'); // true
 */
export declare function isEmail(email: string): boolean;

/**
 * Memeriksa apakah sebuah string adalah nomor telepon Indonesia yang valid.
 * @param phone String nomor telepon yang akan divalidasi.
 * @returns `true` jika format nomor telepon valid.
 * @example
 * isPhoneNumber('081234567890'); // true
 */
export declare function isPhoneNumber(phone: string): boolean;

/**
 * Memeriksa apakah input adalah angka (baik string maupun number).
 * @param value Nilai yang akan divalidasi.
 * @returns `true` jika nilai tersebut adalah angka.
 * @example
 * isNumber('123'); // true
 */
export declare function isNumber(value: string | number): boolean;