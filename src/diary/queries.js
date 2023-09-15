const postDiaryEntry =
  "insert into diary (diary_location, diary_content, user_id) values ($1,$2,$3)";

const getDiaryEntries = "select * from diary where user_id = $1";
const updateDiaryEntry =
  "update diary set diary_content = $1, diary_location = $2 where diary_id = $3 and user_id=$4";
const deleteDiaryEntry = "DELETE FROM diary WHERE diary_id=$1 and user_id=$2";
const getDiaryEntry = "Select * from diary where diary_id=$1 and user_id=$2";

module.exports = {
  postDiaryEntry,
  getDiaryEntries,
  getDiaryEntry,
  getDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
};
