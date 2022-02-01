import nc from "next-connect";

import Options from "../../../models/Options";

import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const options = await Options.find({});
  await db.disconnect();
  res.send(options);
});

export default handler;
