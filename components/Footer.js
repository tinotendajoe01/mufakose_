import {
  CollectionIcon,
  FolderIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/outline";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row    justify-evenly bg-kenlink_blue-dark text-white text-sm">
      <div className="m-5">
        <h1 className="text-xl ">
          KEN<span className="font-semibold">LINK</span>
        </h1>
        <i className="uppercase">YOUR LINK TO A HEALTHY LIFESTLYe</i>
      </div>
      <div className="m-5">
        <h1 className="text-xl mb-4">INFORMATION</h1>
        <p className=" flex">
          {" "}
          <InformationCircleIcon className="h-5" /> About us
        </p>
        <p className="flex">
          {" "}
          <TruckIcon className="h-5" /> Delivery Process
        </p>
        <p className="flex">
          <ShieldCheckIcon className="h-5" /> Privacy Policy
        </p>
      </div>{" "}
      <div className="m-5">
        <h1 className="text-xl">ACCOUNT</h1>
        <p className="flex">
          {" "}
          <UserIcon className="h-5" /> My Profile
        </p>
        <p className="flex">
          <CollectionIcon className="h-5" /> Order History
        </p>
      </div>
    </footer>
  );
};

export default Footer;
