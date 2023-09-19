const { getUserId } = require("../utils");
const queries = require("./queries");
const prisma = require("../../prisma/prisma-client");

// TODO getDiaryEntries
const getDiaryEntries = async (req, res) => {
  const user_email = req.user;
  const user_id = await getUserId(user_email.user_id);
  const getEntries = await prisma.diary.findMany({
    where: {
      userUser_id: user_id,
    },
  });
  res.send(getEntries);
  // pool.query(queries.getDiaryEntries, [user_id], (error, results) => {
  //   res.send(results.rows);
  // });
};
// TODO getDiaryEntry
const getDiaryEntry = async (req, res) => {
  const user_email = req.user;
  const user_id = await getUserId(user_email.user_id);
  console.log(user_id);
  const diary_id = parseInt(req.params.id);
  try {
    const getEntry = await prisma.diary.findMany({
      where: {
        diary_id: diary_id,
        userUser_id: user_id,
      },
    });
    res.json({
      data: getEntry,
    });
  } catch (Error) {
    console.log(Error);
  }
  // pool.query(queries.getDiaryEntry, [diary_id, user_id], (error, results) => {
  //   if (error) throw error;
  //   res.json(results.rows);
  // });
};

// TODO postDiaryEnrty
const postDiaryEntry = async (req, res) => {
  const user_email = req.user.user_id;
  // finding user id to relate diary_id of particular user
  const userId = await getUserId(user_email);
  const { diary_location, diary_content } = req.body;
  try {
    const newEntry = await prisma.diary.create({
      data: {
        diary_content: diary_content,
        diary_location: diary_location,
        User: {
          connect: {
            user_id: userId,
          },
        },
      },
    });
    res.json({
      success: true,
      data: newEntry,
      message: "Diary entry added",
    });
  } catch (error) {
    console.log(error);
  }

  // pool.query(
  //   queries.postDiaryEntry,
  //   [diary_location, diary_content, user_id],
  //   (error, results) => {
  //     // console.log(results.rows);
  //     // returns a flag that indicates whether the insertion was successful or not
  //     // console.log(error);
  //     if (error) throw error;
  //     res.json({
  //       success: true,
  //       data: results.rows,
  //       message: "Diary entry added",
  //     });
  //   }
  // );
};

//TODO updateDiaryEntry
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

// TODO deleteDiaryEntry
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
