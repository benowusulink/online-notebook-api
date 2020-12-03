const NewNote = (req, res, db) => {
  const { id, note, noteTitle } = req.body;

  if (!id || !note || !noteTitle) {
    return res.json("error adding note");
  }

  db("notes")
    .returning("*")
    .insert({
      note: note,
      notetitle: noteTitle,
      id: id,
    })

    .then((data) => {

      return db("notes")
        .where({
          id: id,
        })
        .select("*");
    })

    .then((data) => {
     
      if (data) {
        return res.json({
          status: "success",
          info: data,
        });
      }
    });
};

module.exports = {
  NewNote,
};
