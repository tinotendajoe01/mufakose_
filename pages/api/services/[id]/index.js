import nc from "next-connect";

import Service from "../../../../models/ServiceProvided";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  await db.disconnect();
  res.send(service);
});

export default handler;
