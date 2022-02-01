import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../utils/auth";
import Product from "../../../../../models/Product";
import db from "../../../../../utils/db";
import Service from "../../../../../models/ServiceProvided";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  await db.disconnect();
  res.send(service);
});

handler.put(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  if (service) {
    service.name = req.body.name;
    service.slug = req.body.slug;
    service.price = req.body.price;
    service.category = req.body.category;
    service.image = req.body.image;
    service.featuredImage = req.body.featuredImage;
    service.isFeatured = req.body.isFeatured;
    service.location = req.body.location;

    service.description = req.body.description;
    await service.save();
    await db.disconnect();
    res.send({ message: "Service Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Service Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  if (service) {
    await service.remove();
    await db.disconnect();
    res.send({ message: "Service Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Service Not Found" });
  }
});

export default handler;
