const RegisterHandler = (req, res, db) => {
  /* destructuring info from the request
	to make it easier to use within code */
  const { name, email, hash } = req.body;

  /* conditional check to see if the name,
	email or hash from the request is invalid */
  if (!name || !email || !hash) {
    return res.json("please register details");
  }

  /* starting a knex transaction which allows 
	you to perform multiole actions on multiple
	tables within your database */
  db.transaction((trx) => {
    /* inserting hash and email into login table 
	and returning email*/
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      /* inserting name and user into user table
	 (postgresql will auto increment id)*/
      .then((user) => {
        console.log(user);
        return trx("users").returning("*").insert({
          name: name,
          email: user[0],
        });
      })
      /* sending to the client a success message and the
	id and name of the user */
      .then((data) => {
        console.log(data[0]);
        return res.json({ status: "success", info: data[0] });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    /* catching any errors that may occur during the 
	knex transaction */
    .catch((err) => {
      res.json("error registering");
    });
};

/* exporting function*/
module.exports = {
  RegisterHandler,
};
