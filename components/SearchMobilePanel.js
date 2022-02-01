import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
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
import data from "../utils/data";
import { useRouter } from "next/router";
const SearchMobilePanel = () => {
  const router = useRouter();
  const [searchInputMobile, setSearchInputMobile] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [query, setQuery] = useState("");
  const startSearchFilterMobile = (e) => {
    const searchInput = e.target.value.toLowerCase();
    setQuery(e.target.value);
    setWordEntered(searchInput);
    const newFilterMobile = data.services.filter((service) =>
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
    <div className=" sm:hidden flex flex-col rounded-xl px-2 items-center mt-14 bg-white  mx-2 shadow-sm  list-none ">
      <div className=" flex items-center bg-gray-900 mt-2  shadow-sm  flex-grow w-full m  h-10 rounded-full  cursor-pointer ">
        <input
          onChange={startSearchFilterMobile}
          type="text"
          value={wordEntered}
          placeholder="Start your search"
          className="p-2 text-white mx-5 px-4 input  h-full w-6 flex-grow outline-none  rounded-full flex-shrink focus:outline-none bg-transparent"
        />

        {searchInputMobile.length === 0 ? (
          <SearchIcon onClick={runSearch} className="h-12 p-4 text-white " />
        ) : (
          <XIcon onClick={clearSearch} className="h-12 p-4 text-white " />
        )}
      </div>
      <div className="mb-2">
        <Grid item md={9} xs={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {searchInputMobile.slice(0, 5).map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <NextLink href={`/product/${product.slug}`} passHref>
                        <Link>
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={50}
                            height={50}
                          ></Image>
                        </Link>
                      </NextLink>
                    </TableCell>

                    <TableCell>
                      <NextLink href={`/product/${product.slug}`} passHref>
                        <Link>
                          <Typography>{product.category}</Typography>
                        </Link>
                      </NextLink>
                    </TableCell>

                    <TableCell align="right">${product.price}</TableCell>
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
    </div>
  );
};

export default SearchMobilePanel;
