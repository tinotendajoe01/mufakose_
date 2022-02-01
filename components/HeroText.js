import {
  HomeIcon,
  BadgeCheckIcon,
  UserIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  GlobeAltIcon,
  SearchIcon,
  LightningBoltIcon,
  CollectionIcon,
  ShoppingBagIcon,
  ArrowCircleDownIcon,
  XIcon,
} from "@heroicons/react/outline";

import Image from "next/image";
import NextLink from "next/link";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import { useState } from "react";
import { useRouter } from "next/router";

// import { ArrowCircleDownIcon } from "@heroicons/react/solid";
const HeroText = ({ services }) => {
  const router = useRouter();
  const [searchInputMobile, setSearchInputMobile] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [query, setQuery] = useState("");
  const startSearchFilterMobile = (e) => {
    const searchInput = e.target.value.toLowerCase();
    setQuery(e.target.value);
    setWordEntered(searchInput);
    const newFilterMobile = services.filter((service) =>
      service.category.toLowerCase().includes(searchInput)
    );
    if (searchInput === "") {
      setSearchInputMobile([]);
    } else setSearchInputMobile(newFilterMobile);
  };
  const clearSearch = () => {
    setSearchInputMobile([]);
    setWordEntered("");
  };
  const runSearch = () => {
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <div className="viewboard relative max-w-5xl mx-auto pt-10 sm:pt-24 lg:pt-16">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Quickly get things done, without ever leaving your home or your
          office!
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl  mx-auto dark:text-white-slate-400">
          A seamless dynamic service hiring and booking platform.
        </p>
        <div
          className="flex items-center focus:ring-2 focus:ring-blue-500 focus:outline-none 
          appearance-none  text-sm leading-6 text-slate-900 placeholder-slate-400
           rounded-full  ring-1 ring-slate-200 shadow-sm content-center mx-10 mt-2 "
        >
          <input
            onChange={startSearchFilterMobile}
            type="text"
            aria-label="Filter projects"
            placeholder="Filter projects..."
            value={wordEntered}
            type="text"
            placeholder="Search By Category.."
            className="outline-none items-center text-center bg-transparent flex-grow text-sm text-gray-600 placeholder-gray-400"
          />
          {searchInputMobile.length === 0 ? (
            <SearchIcon
              onClick={runSearch}
              className="h-12 p-4 text-[#38BDF8]"
            />
          ) : (
            <XIcon onClick={clearSearch} className="h-12 p-4 text-red-600 " />
          )}{" "}
        </div>
        <div className="pb-45 flex items-center justify-center ">
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableBody>
                  {searchInputMobile.slice(0, 3).map((service) => (
                    <TableRow key={service._id}>
                      <TableCell>
                        <NextLink href={`/service/${service.slug}`} passHref>
                          <Link>
                            <Image
                              src={service.image}
                              alt={service.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/service/${service.slug}`} passHref>
                          <Link>
                            <Typography>{service.category}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align="right">${service.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          className="button"
                          color="primary"
                        >
                          Book
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>

        <div className="arrowcenter  mt-3  flex justify-center items-center">
          <ArrowCircleDownIcon
            onClick={() => router.push("/#main")}
            className="h-10 rounded-full  cursor-pointer animate-bounce text-[#38BDF8]"
          />
        </div>
      </div>
    </>
  );
};

export default HeroText;
