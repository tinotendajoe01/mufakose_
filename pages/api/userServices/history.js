import nc from "next-connect";

import Service from "../../../models/ServiceProvided";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/error";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const services = await Service.find({ user: req.user._id });
  res.send(services);
});
handler.post(async (req, res) => {
  await db.connect();
  const newService = new Service({
    name: "Write your name",
    slug: "slug" + Math.random(),
    image: "/logo.svg",
    price: 0,
    category: "category",
    location: "location",

    description: "description",
    rating: 0,
    numReviews: 0,
  });

  const service = await newService.save();
  await db.disconnect();
  res.send({ message: "Service Created", service });
});

export default handler;
