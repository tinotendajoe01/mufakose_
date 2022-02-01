// /api/products/:id/reviews
import mongoose from "mongoose";
import nextConnect from "next-connect";
import { onError } from "../../../../utils/error";
import db from "../../../../utils/db";

import Service from "../../../../models/ServiceProvided";
import { isAuth } from "../../../../utils/auth";

const handler = nextConnect({
  onError,
});

handler.get(async (req, res) => {
  db.connect();
  const service = await Service.findById(req.query.id);
  db.disconnect();
  if (service) {
    res.send(service.reviews);
  } else {
    res.status(404).send({ message: "Service not found" });
  }
});

handler.use(isAuth).post(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  if (service) {
    const existReview = service.reviews.find((x) => x.user == req.user._id);
    if (existReview) {
      await Service.updateOne(
        { _id: req.query.id, "reviews._id": existReview._id },
        {
          $set: {
            "reviews.$.comment": req.body.comment,
            "reviews.$.rating": Number(req.body.rating),
          },
        }
      );

      const updatedService = await Service.findById(req.query.id);
      updatedService.numReviews = updatedService.reviews.length;
      updatedService.rating =
        updatedService.reviews.reduce((a, c) => c.rating + a, 0) /
        updatedService.reviews.length;
      await updatedService.save();

      await db.disconnect();
      return res.send({ message: "Review updated" });
    } else {
      const review = {
        user: mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      service.reviews.push(review);
      service.numReviews = service.reviews.length;
      service.rating =
        service.reviews.reduce((a, c) => c.rating + a, 0) /
        service.reviews.length;
      await service.save();
      await db.disconnect();
      res.status(201).send({
        message: "Review submitted",
      });
    }
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Service Not Found" });
  }
});

export default handler;
