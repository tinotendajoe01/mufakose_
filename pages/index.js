/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { Grid, Link, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import db from "../utils/db";

import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";

import Header from "../components/Header";
import HeroText from "../components/HeroText";
import Image from "next/image";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/solid";

import Rating from "@material-ui/lab/Rating";

import Service from "../models/ServiceProvided";

export default function Home({ services }) {
  const moreServices = (e) => {
    const main = document.querySelector(".main");
    const btn = document.querySelector(".btn");
    btn.addEventListener("click", (e) => {
      console.log(main.classList);
      main.classList.remove("max-h-[33rem]");
      main.classList.add("max-h-full");
      console.log(main.classList);
    });
  };
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/");
    }
  }, []);
  return (
    <div className="h-full">
      <Header />
      <Layout>
        <HeroText services={services} />
        <>
          <section
            id="main"
            className=" max-w-5xldd mx-auto mt-20  items-center viewboard "
          >
            <section
              // tabindex="-1"
              className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5"
            >
              <div class="main grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-h-full overflow-hidden">
                <ul class="space-y-8">
                  {services.map((service) => (
                    <li class="text-sm leading-6 ">
                      <figure
                        id={service._id}
                        class="relative flex flex-col-reverse bg-[#E0E0E0] hover:bg-blue-400 hover:text-white  rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5"
                      >
                        <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
                          <p>{service.description}</p>
                          <div className="flex justify-between items-center">
                            {" "}
                            <div>
                              {" "}
                              <p>$ {service.price}</p>
                              <Rating value={service.rating} readOnly></Rating>
                            </div>
                            <button className="button">Hire me</button>
                          </div>
                        </blockquote>
                        <figcaption class="flex items-center space-x-4">
                          <img
                            src={service.image}
                            alt=""
                            class="flex-none w-14 h-14 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div class="flex-auto">
                            <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                              <a tabindex="0" href={`/service/${service.slug}`}>
                                <span class="absolute inset-0"></span>
                                {service.name}
                              </a>
                            </div>
                            <div class="mt-0.5">{service.category}</div>
                          </div>
                        </figcaption>
                      </figure>{" "}
                    </li>
                  ))}
                </ul>
                <ul class="space-y-8  ">
                  {" "}
                  {services.map((service) => (
                    <li class="text-sm leading-6 ">
                      <figure
                        id={service._id}
                        class="relative flex flex-col-reverse bg-[#E0E0E0] hover:bg-blue-400 hover:text-white  rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5"
                      >
                        <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
                          <p>{service.description}</p>
                          <div className="flex justify-between items-center">
                            {" "}
                            <div>
                              {" "}
                              <p>$ {service.price}</p>
                              <Rating value={service.rating} readOnly></Rating>
                            </div>
                            <button className="button">Hire me</button>
                          </div>
                        </blockquote>
                        <figcaption class="flex items-center space-x-4">
                          <img
                            src={service.image}
                            alt=""
                            class="flex-none w-14 h-14 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div class="flex-auto">
                            <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                              <a
                                href=""
                                tabindex="0"
                                href={`/service/${service.slug}`}
                              >
                                <span class="absolute inset-0"></span>
                                {service.name}
                              </a>
                            </div>
                            <div class="mt-0.5">{service.category}</div>
                          </div>
                        </figcaption>
                      </figure>{" "}
                    </li>
                  ))}
                </ul>
                <ul class="space-y-8 hidden lg:block">
                  {" "}
                  {services.map((service) => (
                    <li class="text-sm leading-6 ">
                      <figure
                        id={service._id}
                        class="relative flex flex-col-reverse bg-[#E0E0E0] hover:bg-blue-400 hover:text-white  rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5"
                      >
                        <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
                          <p>{service.description}</p>
                          <div className="flex justify-between items-center">
                            {" "}
                            <div>
                              {" "}
                              <p>$ {service.price}</p>
                              <Rating value={service.rating} readOnly></Rating>
                            </div>
                            <button className="button">Hire me</button>
                          </div>
                        </blockquote>
                        <figcaption class="flex items-center space-x-4">
                          <img
                            src={service.image}
                            alt=""
                            class="flex-none w-14 h-14 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div class="flex-auto">
                            <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                              <a
                                href=""
                                tabindex="0"
                                href={`/service/${service.slug}`}
                              >
                                <span class="absolute inset-0"></span>
                                {service.name}
                              </a>
                            </div>
                            <div class="mt-0.5">{service.category}</div>
                          </div>
                        </figcaption>
                      </figure>{" "}
                    </li>
                  ))}
                </ul>
              </div>

              <div class="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900 absolute">
                {/* <button
                  onclick={moreServices}
                  type="button"
                  class="button btn relative bg-slate-900 hover:bg-[#99bac9] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600 
                 pointer-events-auto"
                >
                  Show more...
                </button> */}
              </div>
            </section>
          </section>
        </>
      </Layout>
    </div>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const services = await Service.find({}).lean();

  await db.disconnect();
  return {
    props: {
      services: services.map(db.convertDocToObj),
    },
  };
}
