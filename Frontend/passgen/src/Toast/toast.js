import { toast } from "react-toastify";

export const errorToast = (msg) => {
  toast.error(msg, {
    className: "dark:bg-[#0d3c5f] text-black dark:text-white bg-slate-100",
    position: "top-center",
    autoClose: 3000,
  });
};

export const successToast = (msg) => {
  toast.success(msg, {
    className: "dark:bg-[#0d3c5f] text-black dark:text-white bg-slate-100",
    position: "top-center",
    autoClose: 3000,
  });
};
