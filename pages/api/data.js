const db = require("../../util/database");

const data = async (req, res) => {
  const id = req.query.id;
  const champion = req.query.champion;
  console.log(id);
  console.log(champion);

  const [ids] = await db.execute(
    "SELECT id, champion FROM survey WHERE id <= ?",
    [id]
  );

  const filtered = ids.filter((id) => {
    return id.champion === champion;
  });
  return res.send({ total: ids.length, count: filtered.length });
};

export default data;
