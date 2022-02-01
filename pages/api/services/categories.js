import nc from "next-connect";

import Service from "../../../models/ServiceProvided";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const categories = await Service.find().distinct("category");
  await db.disconnect();
  res.send(categories);
});

export default handler;
