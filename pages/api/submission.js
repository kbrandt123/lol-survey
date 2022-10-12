// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../../util/database");
export default async function submitForm(req, res) {
  if (req.body == undefined) return;
  console.log(req.body);
  if (req.method === "POST") {
    db.execute(
      "INSERT INTO survey (username, email, age, time, recommendations, champion, improvements, comments ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.username,
        req.body.email,
        req.body.age,
        req.body.time,
        req.body.recommendations,
        req.body.champion,
        JSON.stringify(req.body.improvements),
        req.body.comments,
      ]
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));

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
    return res.status(200).json({ total: ids.length, count: filtered.length });
  } else {
    res.status(418).json({ error: "Im a little teapot" });
  }
}
