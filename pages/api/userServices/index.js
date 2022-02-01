import nc from "next-connect";
import Order from "../../../models/Order";
import Service from "../../../models/ServiceProvided";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/error";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newService = new Service({
    ...req.body,
    user: req.user._id,
  });
  const service = await newService.save();
  res.status(201).send(service);
});

export default handler;
