
const sanitizePhoneNumber = number => {
  let reduced = number.replaceAll (/[^0-9]/g, '');
  if (reduced.length !== 10) throw new Error ('Phone number must be 10 digits, current length: ' + reduced.length);
  return '+1' + reduced;
}

export default sanitizePhoneNumber