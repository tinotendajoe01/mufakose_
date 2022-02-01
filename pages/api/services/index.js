import nc from "next-connect";

import Service from "../../../models/ServiceProvided";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const services = await Service.find({});
  await db.disconnect();
  res.send(services);
});

export default handler;
