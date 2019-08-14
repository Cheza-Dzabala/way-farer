
const generateId = (array) => {
  const id = array.length + 1;
  return id;
};

const generatePassword = () => Math.random().toString(36).slice(2);

module.exports = {
  generateId, generatePassword,
};
