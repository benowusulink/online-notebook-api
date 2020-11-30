const SignIn = (req, res, bcrypt, db) => {
  /* grab email and password from client */
  const { email, password } = req.body;
  console.log(email, password);

  /* if no email or password is received return 
	to the client error message */
  if (!email || !password) {
    return res.json("error");
  }

  console.log(email, password);

  /* if no email or password is received return 
	to the client error message */
  return db("login")
    .where({
      email: email,
    })
    .select("email", "hash")

    .then((data) => {
      console.log(data[0]);
      //const isValid = bcrypt.compareSync(password, data[0].hash);

      if (password === data[0].hash && email === data[0].email) {
        return db("users")
          .where({
            email: email,
          })
          .select("name", "id");
      }
    })
    .then((data) => {
      console.log(data[0]);
      res.json({
        info: data[0],
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json("error");
    });
};

module.exports = {
  SignIn,
};
