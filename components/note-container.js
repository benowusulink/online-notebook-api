const NoteContainer = (req, res, db) => {
  const { id } = req.body;

  if (!id) {
    return res.json("error getting notes");
  }

  return db("notes")
    .where({
      id: id,
    })
    .select("*")
    .then((data) => {
      return res.json({
        status: "success",
        info: data,
      });
    })
    .catch((err) => {
      res.json("error getting notes");
    });
};

module.exports = {
  NoteContainer,
};
