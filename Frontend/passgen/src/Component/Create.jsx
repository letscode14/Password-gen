import { useState } from "react";
import Loading from "./Loading";
import Slider from "./Slider";

export default function Create() {
  const [values, setData] = useState({
    length: 8,
    special: false,
    numbers: false,
    uppercase: false,
    symbols: false,
  });

  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (loading) {
      return;
    }
    setLoading(true);
  };
  return (
    <div className=" flex grow items-center justify-center">
      <div className=" space-y-6 w-[600px]">
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-lg dark:text-white text-sm font-medium leading-6 text-gray-900"
          >
            Your Password
          </label>
          <div className="mt-2">
            <div className="dark:bg-[#0d3c5f] bg-slate-200  h-24 rounded-lg flex justify-center  items-center">
              <span className="dark:text-slate-500 text-black ">
                Your password displayed here
              </span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-lg dark:text-white text-sm font-medium leading-6 text-gray-900"
          >
            Password length
          </label>
          <Slider />
        </div>
        <label
          htmlFor="username"
          className="block text-lg dark:text-white text-sm font-medium leading-6 text-gray-900"
        >
          Settings
        </label>
        <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
          <div className="text-sm leading-6  ">
            <label
              htmlFor="comments"
              className="font-medium dark:text-white text-black text-base "
            >
              Special charecters
            </label>
            <p className="text-gray-500">
              Password will include special charecter #$%^&*
            </p>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
          <div className="text-sm leading-6  ">
            <label
              htmlFor="comments"
              className="font-medium dark:text-white text-black text-base "
            >
              Include uppercase
            </label>
            <p className="text-gray-500">
              Password will include uppercase charecters A-Z*
            </p>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
          <div className="text-sm leading-6  ">
            <label
              htmlFor="comments"
              className="font-medium dark:text-white text-black text-base "
            >
              Include symbols
            </label>
            <p className="text-gray-500">
              Password will include special charecter {"[]<>-+&"}
            </p>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
          <div className="text-sm leading-6  ">
            <label
              htmlFor="comments"
              className="font-medium dark:text-white text-black text-base "
            >
              Include Numbers
            </label>
            <p className="text-gray-500">Password will include numbers 1-10</p>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className=" flex justify-center">
          <button
            onClick={generate}
            className="min-w-40 min-h-9 flex items-center justify-center uppercase dark:bg-[#1e88d8] bg-[#000000] px-10 py-2 font-semibold rounded-lg text-sm"
          >
            {loading ? <Loading /> : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
