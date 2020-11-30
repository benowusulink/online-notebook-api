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
      console.log(data);
      return db("notes")
        .where({
          id: id,
        })
        .select("*");
    })

    .then((data) => {
      console.log(data);
      if (data) {
        return res.json({
          status: "success",
          info: data,
        });
      }
    });
};

/* return db('notes')
    .returning('*')
    .insert({note: note,
             notetitle: noteTitle,
             id: id
    })

    db('notes')
    .where({
    id: id
      })
    .select('*')

    .then((data)=>{
      console.log(data[0]);
      if(data[0].id){
        return(
        res.json({
          status:"success",
          info: data[0]
      })
    )}}) */

module.exports = {
  NewNote,
};
