import Image from "next/image";
import NextLink from "next/link";
import data from "../utils/data";
import { useSnackbar } from "notistack";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  MenuIcon,
  HomeIcon,
  CursorClickIcon,
  BadgeCheckIcon,
  UserCircleIcon,
  SearchIcon,
  LightningBoltIcon,
  FireIcon,
  CollectionIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  HeartIcon,
  TrashIcon,
  SearchCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  InputBase,
} from "@material-ui/core";
import HeaderItem from "./HeaderItem";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useContext, useState } from "react";

import { Store } from "../utils/Store";
import axios from "axios";
import Cookies from "js-cookie";
import SearchMobilePanel from "./SearchMobilePanel";
import UploadMobilePanel from "./UploadMobilePanel";
const Header = ({ title, description }) => {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const router = useRouter();

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  const runSearch = () => {
    router.push(`/search?query=${query}`);
  };

  //MENU BTN IN NAV
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
    console.log("click");
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("deliveryAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  ///sidebar
  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/services/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const [searchMobileVisible, setSearchMobileVisible] = useState(false);
  const searchMobileOpenHandler = () => {
    setSearchMobileVisible(true);
  };
  const searchMobileCloseHandler = () => {
    setSearchMobileVisible(false);
  };

  return (
    <>
      <header className="sticky top-0 bg-[#e0e0e0] z-50">
        <div className="flex flex-col sm:flex-row m-0 pt-5 shadow-xl justify-between items-center ">
          <div className="flex flex-grow justify-evenly max-w-2xl ">
            <div onClick={() => router.push("/")}>
              <HeaderItem title="HOME" Icon={HomeIcon} href="/" />
            </div>
            <NextLink href="" passHref>
              <div>
                <HeaderItem title="trending" Icon={FireIcon} />
              </div>
            </NextLink>

            <HeaderItem title="PRIME" Icon={CursorClickIcon} />
            <HeaderItem title="INFO" Icon={InformationCircleIcon} />
            <HeaderItem title="Cluster" Icon={CollectionIcon} />

            {userInfo ? (
              <>
                <div onClick={loginClickHandler}>
                  <HeaderItem
                    title={userInfo.name}
                    Icon={UserCircleIcon}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  />
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                  >
                    Booking History
                  </MenuItem>

                  <MenuItem
                    onClick={(e) =>
                      loginMenuCloseHandler(e, "/admin/dashboard")
                    }
                  >
                    Console
                  </MenuItem>

                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <div onClick={() => router.push("/login")}>
                <HeaderItem title="Login" Icon={UserCircleIcon} />
              </div>
            )}
          </div>

          <div className=" hidden sm:fle -mt-5 items-center shadow-sm border border-gray-900  h-10 rounded-full flex-grow cursor-pointer bg-gray-900">
            <input
              name="query"
              onChange={queryChangeHandler}
              type="text"
              placeholder="Start your search"
              className="p-2 text-white input px-4 h-full w-6 flex-grow  rounded-full flex-shrink focus:outline-none bg-transparent"
            />

            <SearchIcon
              onClick={runSearch}
              className="h-12 p-4 text-white "
              // placeholder="Start Searching Meds"
            />
          </div>
          <div className="flex flex-grow items-center justify-between sm:flex-grow-0 -mt-5">
            <Image
              onClick={() => router.push("/")}
              className="sm:w-1 cursor-pointer "
              src="/logo.svg"
              width={150}
              height={40}
              objectFit="contain"
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center space-x-3 pl-6 list-none bg-kenlink_blue-dark text-white text-sm">
          <li className="link flex items-center">
            <div onClick={sidebarOpenHandler} class="burger  ">
              <div class="line1 bg-dark"></div>
              <div class="line2 bg-dark"></div>
              <div class="line3 bg-dark"></div>
            </div>
          </li>
          <div>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Find By Category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <XIcon className="h-5 text-kenlink_blue-dark" />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>
          </div>
          <li onClick={searchMobileOpenHandler}>
            <SearchIcon className="h-5 search__iconMobile cursor-pointer sm:hidden lg:hidden xl:hidden " />
          </li>

          <li className="cursor-pointer ">Zesa</li>

          <li className="cursor-pointer ">Fuel</li>
          <li className="cursor-pointer ">Jobs</li>

          <li className="hidden cursor-pointer lg:inline-flex">Change Money</li>
          <li className="hidden cursor-pointern lg:inline-flex">USSD CODES</li>
          <li className="hidden cursor-pointer lg:inline-flex">Projects</li>
          <li className="hidden cursor-pointer lg:inline-flex">e-learning</li>
        </div>
        <div>
          <div>
            <Drawer
              anchor="top"
              open={searchMobileVisible}
              onClose={searchMobileCloseHandler}
            >
              <SearchMobilePanel />
            </Drawer>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
