import nc from "next-connect";
import db from "../../utils/db";
import data from "../../utils/data";
import User from "../../models/User";

import Service from "../../models/ServiceProvided";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Service.deleteMany();
  await Service.insertMany(data.services);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
