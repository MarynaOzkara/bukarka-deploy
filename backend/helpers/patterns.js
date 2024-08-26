const patterns = {
  name: /^[a-zA-Zа-яА-ЯЇїІіЄєҐґ]*$/,
  phone: /^\d{9}$/,
  // email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  email: /^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<!\.)$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%*()_]).{8,}$/,
};

module.exports = patterns;
