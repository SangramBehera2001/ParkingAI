// 🔒 Mask phone number: +919000000001 → +91******0001
const maskPhone = (phone) => {
  if (!phone) return null;

  const str = phone.toString();

  if (str.length <= 4) return str;

  const visibleStart = str.slice(0, 3);  // +91
  const visibleEnd = str.slice(-4);      // last 4 digits

  return `${visibleStart}${'*'.repeat(str.length - 7)}${visibleEnd}`;
};


// 🔒 Mask email: krishna@gmail.com → k*****a@gmail.com
const maskEmail = (email) => {
  if (!email) return null;

  const [name, domain] = email.split('@');

  if (!name || !domain) return email;

  if (name.length <= 2) return email;

  return `${name[0]}${'*'.repeat(name.length - 2)}${name.slice(-1)}@${domain}`;
};


module.exports = {
  maskPhone,
  maskEmail
};