import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import db from "../utils/db";

import useStyles from "../utils/styles";

import { Store } from "../utils/Store";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { Pagination } from "@material-ui/lab";
import Header from "../components/Header";
import NextLink from "next/link";
import Image from "next/image";
import Service from "../models/ServiceProvided";
const PAGE_SIZE = 3;

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    location = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;
  const { services, countServices, categories, locations, pages } = props;

  const filterSearch = ({
    page,
    category,
    location,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (location) query.location = location;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const locationHandler = (e) => {
    filterSearch({ location: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);

  return (
    <>
      <Header />
      <Layout title="Search">
        <Grid className={classes.mt1} container spacing={1}>
          <Grid item md={3}>
            <List>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>Categories</Typography>
                  <Select fullWidth value={category} onChange={categoryHandler}>
                    <MenuItem value="all">All</MenuItem>
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>Locations</Typography>
                  <Select value={location} onChange={locationHandler} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {locations &&
                      locations.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>Prices</Typography>
                  <Select value={price} onChange={priceHandler} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price.value} value={price.value}>
                        {price.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>Ratings</Typography>
                  <Select value={rating} onChange={ratingHandler} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {ratings.map((rating) => (
                      <MenuItem dispaly="flex" key={rating} value={rating}>
                        <Rating value={rating} readOnly />
                        <Typography component="span">&amp; Up</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={9}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {services.length === 0 ? "No" : countServices} Results
                {query !== "all" && query !== "" && " : " + query}
                {category !== "all" && " : " + category}
                {location !== "all" && " : " + location}
                {price !== "all" && " : Price " + price}
                {rating !== "all" && " : Rating " + rating + " & up"}
                {(query !== "all" && query !== "") ||
                category !== "all" ||
                location !== "all" ||
                rating !== "all" ||
                price !== "all" ? (
                  <Button onClick={() => router.push("/search")}>
                    <CancelIcon />
                  </Button>
                ) : null}
              </Grid>
              <Grid item>
                <Typography component="span" className={classes.sort}>
                  Sort by
                </Typography>
                <Select value={sort} onChange={sortHandler}>
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="lowest">Price: Low to High</MenuItem>
                  <MenuItem value="highest">Price: High to Low</MenuItem>
                  <MenuItem value="toprated">Customer Reviews</MenuItem>
                  <MenuItem value="newest">New Services</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid className={classes.mt1} container spacing={3}>
              {services.map((service) => (
                <Grid item md={4} key={service.name}>
                  <div className="border bg-transparent rounded-xl shadow-sm ">
                    <NextLink href={`/service/${service.slug}`} passHref>
                      <div className="relative rounded-2xl h-20 w-40 md:h-52 md:w-80 flex-shrink-0 z-30">
                        <Image
                          src={service.image}
                          layout="fill"
                          objectFit="contain"
                          //   objectFit="cover"
                          className="rounded-2xl"
                        />
                      </div>
                    </NextLink>

                    <div className=" flex flex-col items-center ">
                      {/* <h1 className="">{service.name}</h1> */}
                      <h1 className="">{service.category}</h1>
                      <Rating value={service.rating} readOnly></Rating>

                      <h4 className="font-bold">${service.price}</h4>
                    </div>

                    <div className="flex items-center pb-1 justify-center">
                      <button className="button">BOOK</button>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Pagination
              className={classes.mt1}
              defaultPage={parseInt(query.page || "1")}
              count={pages}
              onChange={pageHandler}
            ></Pagination>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const location = query.location || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const locationFilter = location && location !== "all" ? { location } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Service.find().distinct("category");
  const locations = await Service.find().distinct("location");
  const serviceDocs = await Service.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...locationFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countServices = await Service.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...locationFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const services = serviceDocs.map(db.convertDocToObj);

  return {
    props: {
      services,
      countServices,
      page,
      pages: Math.ceil(countServices / pageSize),
      categories,
      locations,
    },
  };
}
