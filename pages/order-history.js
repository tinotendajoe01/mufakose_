import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  ListItemText,
} from "@material-ui/core";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import Header from "../components/Header";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderHistory() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  return (
    <>
      <Header />
      <Layout title="Order History">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NextLink href="/profile" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Profile Details"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/order-history" passHref>
                  <ListItem selected button component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Go Back"></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
