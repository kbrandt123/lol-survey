// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../../util/database");

const submitForm = async (req, res) => {
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
  } else {
    res.status(418).json({ error: "Im a little teapot" });
  }
};

export default submitForm;
