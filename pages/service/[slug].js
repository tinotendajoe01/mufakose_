import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";

import db from "../../utils/db";
import axios from "axios";
import { Store } from "../../utils/Store";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import Header from "../../components/Header";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Service from "../../models/ServiceProvided";
export default function ProductScreen({ service }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/services/${service._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/services/${service._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  if (!service) {
    return <div>Service Not Found</div>;
  }

  return (
    <>
      <Header />
      <Layout title={service.name} description={service.description}>
        <main>
          <div className="hover:animate-pulse mt-5 ">
            <NextLink href="/" passHref>
              <Link>
                <ArrowLeftIcon className="h-6 text-kenlink_blue-dark" />
              </Link>
            </NextLink>
          </div>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <div>
                <Image
                  src={service.image}
                  alt={service.name}
                  width={640}
                  height={640}
                  layout="responsive"
                  className="scale cursor-pointer"
                />
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h4">
                    {service.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Category: {service.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Location: {service.location}</Typography>
                </ListItem>
                <ListItem>
                  <Rating value={service.rating} readOnly></Rating>
                  <Link href="#reviews">
                    <Typography>({service.numReviews} reviews)</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Typography> Description: {service.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${service.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Service</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {service.countInStock > 0
                            ? "Available"
                            : "Unavailable"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="button"
                    >
                      Book
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
          <List>
            <ListItem>
              <Typography name="reviews" id="reviews" variant="h5">
                Client Reviews
              </Typography>
            </ListItem>
            {reviews.length === 0 && <ListItem>No review</ListItem>}
            {reviews.map((review) => (
              <ListItem key={review._id}>
                <Grid container>
                  <Grid item className={classes.reviewItem}>
                    <Typography>
                      <strong>{review.name}</strong>
                    </Typography>
                    <Typography>{review.createdAt.substring(0, 10)}</Typography>
                  </Grid>
                  <Grid item>
                    <Rating value={review.rating} readOnly></Rating>
                    <Typography>{review.comment}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <ListItem>
              {userInfo ? (
                <form onSubmit={submitHandler} className={classes.reviewForm}>
                  <List>
                    <ListItem>
                      <Typography variant="h6">Leave your review</Typography>
                    </ListItem>
                    <ListItem>
                      <TextField
                        multiline
                        variant="outlined"
                        fullWidth
                        name="review"
                        label="Enter comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="button"
                      >
                        Submit
                      </Button>

                      {loading && <CircularProgress></CircularProgress>}
                    </ListItem>
                  </List>
                </form>
              ) : (
                <Typography variant="h2">
                  Please{" "}
                  <Link href={`/login?redirect=/service/${service.slug}`}>
                    login
                  </Link>{" "}
                  to write a review
                </Typography>
              )}
            </ListItem>
          </List>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const service = await Service.findOne({ slug }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      service: db.convertDocToObj(service),
    },
  };
}
