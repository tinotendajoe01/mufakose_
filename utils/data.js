import { ExpansionPanelDetails } from "@material-ui/core";
import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Joe",
      email: "joe@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
    {
      name: "Wilmot",
      email: "wilmot@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
  ],

  services: [
    {
      name: "John Doe",
      slug: "johndoe",
      category: "Barber",
      image: "/logo.svg",
      price: 13,
      location: "Mufakose",
      rating: 4.5,
      numReviews: 10,
      description: "best barber in town",
    },
    {
      name: "Jane Doe",
      slug: "Jane",
      category: "Hair dresser",
      image: "/logo.svg",
      price: 13,
      location: "Mufakose",
      rating: 4.5,
      numReviews: 10,
      description: "best in town",
    },
    {
      name: "Smith Doe",
      slug: "smith",
      category: "capentry",
      image: "/logo.svg",
      price: 13,
      location: "Mufakose",
      rating: 4.5,
      numReviews: 10,
      description: "best in town",
    },
    {
      name: "Anesu",
      slug: "Anesu",
      category: "electrician",
      image: "/logo.svg",
      price: 13,
      location: "Mufakose",
      rating: 4.5,
      numReviews: 10,
      description: "best  in town",
    },
    {
      name: "Tapiwa",
      slug: "tapiwa",
      category: "money changer",
      image: "/logo.svg",
      price: 13,
      location: "Mufakose",
      rating: 4.5,
      numReviews: 10,
      description: "best  in town",
    },
  ],
};
export default data;
