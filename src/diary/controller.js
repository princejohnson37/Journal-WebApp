
const { getUserId } = require("../utils");
const queries = require("./queries");

const getDiaryEntries = async (req, res) => {
  const user_email = req.user;
  console.log(`user email is ${user_email}`);
  const user_id = await getUserId(user_email.user_id);
  pool.query(queries.getDiaryEntries, [user_id], (error, results) => {
    res.send(results.rows);
  });
};

const getDiaryEntry = async (req, res) => {
  const user_email = req.user;
  const user_id = await getUserId(user_email.user_id);
  console.log(req.params);
  const diary_id = req.params.id;
  pool.query(queries.getDiaryEntry, [diary_id, user_id], (error, results) => {
    if (error) throw error;
    res.json(results.rows);
  });
};

const postDiaryEntry = async (req, res) => {
  const user_email = req.user.user_id;
  const user_id = await getUserId(user_email);
  const { diary_location, diary_content } = req.body;
  console.log(
    `useremail:- ${user_email},user_id:-${user_id}, body:- ${req.body}`
  );
  pool.query(
    queries.postDiaryEntry,
    [diary_location, diary_content, user_id],
    (error, results) => {
      // console.log(results.rows);
      // returns a flag that indicates whether the insertion was successful or not
      // console.log(error);
      if (error) throw error;
      res.json({
        success: true,
        data: results.rows,
        message: "Diary entry added",
      });
    }
  );
};

const updateDiaryEntry = async (req, res) => {
  const user_email = req.user.user_id;
  const user_id = await getUserId(user_email);
  const { diary_id, diary_location, diary_content } = req.body;
  // const dairy_id = req.params.id;
  // To-do - check if user has access to this diary_id
  // check wheather user_id is the same as the user_id of the diary_id
  // if not, throw an error
  // else update the diary entry
  // update date and time of diary entry too, currently not changing
  pool.query(
    queries.updateDiaryEntry,
    [diary_content, diary_location, diary_id, user_id],
    (error, results) => {
      res.json({
        success: true,
        data: results.rows,
        message: "Diary entry updated",
      });
    }
  );
};

const deleteDiaryEntry = async (req, res) => {
  const user_email = req.user.user_id;
  const user_id = await getUserId(user_email);
  const diary_id = req.params.id;
  // To-do - check if user has access to this diary_id
  // check wheather user_id is the same as the user_id of the diary_id
  // if not, throw an error
  // else delete the diary entry
  pool.query(
    queries.deleteDiaryEntry,
    [diary_id, user_id],
    (error, results) => {
      if (error) throw error;
      res.json({
        success: true,
        data: results.rows,
        message: "Diary entry deleted",
      });
    }
  );
};

module.exports = {
  getDiaryEntries,
  postDiaryEntry,
  updateDiaryEntry,
  getDiaryEntry,
  deleteDiaryEntry,
};
