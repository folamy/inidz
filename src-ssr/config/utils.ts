export const emailPhone = async (emailOrNum: string) => {
  const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(emailOrNum),
    number = /^[0]\d{10}$/.test(emailOrNum),
    query = `SELECT * FROM customers WHERE ${
      email ? 'email' : 'phoneNumber'
    } = "${emailOrNum}"`;

  return {
    query,
    email,
    number,
  };
};
