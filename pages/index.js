import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Nav from '@/components/Nav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';

export default function Home({dates, data}) {
  
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
  
  
    let AllCases = []
    selected.length > 0 && (AllCases = data?.filter(cov => cov.date === selected))
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      
      <div>
        <Nav />
        <div className="bg-cyan-900 flex flex-col justify-center h-screen pt-20 overflow-auto rounded-lg shadow">
        
      {/* Start select box */}
      <div className="w-72 font-medium h-auto items-center self-center">
        <div
          onClick={() => setOpen(!open)}
          className={`bg-white w-full p-2 flex items-center justify-between rounded ${
            !selected && "text-gray-700"
          }`}
        >
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + "..."
              : selected.slice(0,10)
            : "Select Year"}
          {/* <BiChevronDown size={20} className={`${open && "rotate-180"}`} /> */}
        </div>
        <ul
          className={`bg-white mt-2 overflow-y-auto ${
            open ? "max-h-60" : "max-h-0"
          } `}
        >
          <div className="flex items-center px-2 sticky top-0 bg-white">
            {/* <AiOutlineSearch size={18} className="text-gray-700" /> */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter date"
              className="placeholder:text-gray-700 p-2 outline-none"
            />
          </div>
          {dates?.map((date,index) => (
            <li
              key={index}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                date?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                date?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
              onClick={() => {
                if (date?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(date);
                  setOpen(false);
                  setInputValue("");
                }
              }}
            >
              {date.slice(0,10)}
            </li>
          ))}
        </ul>
      </div>
      {/* End select box */}
        
          <table className='shadow-2x1 font-[Poppins] border-2 border-cyan-200 w-11/12 mx-auto'>
            <thead className='text-white'>
              <tr>
            <th className='py-3 bg-cyan-800'>Hospital cases</th>
            <th className='py-3 bg-cyan-800'>Propable cases</th>
            <th className='py-3 bg-cyan-800'>Propable death</th>
            <th className='py-3 bg-cyan-800'>Confirm cases</th>
            <th className='py-3 bg-cyan-800'>Confirm death</th>
            <th className='py-3 bg-cyan-800'>Total cases</th>
            <th className='py-3 bg-cyan-800'>Total deaths</th>
            <th className='py-3 bg-cyan-800'>case 0-9</th>
            <th className='py-3 bg-cyan-800'>case 80-older</th>
            </tr>
            </thead>
            <tbody>
              {AllCases?.map((casee,index) => 
                <tr key={index} className='hover:bg-cyan-100 bg-cyan-300 cursor-pointer duration-300'>
                  <td className='py-3 px-6'>{casee.hospitalizedcases}</td>
                  <td className='py-3 px-6'>{casee.probablecases}</td>
                  <td className='py-3 px-6'>{casee.probabledeaths}</td>
                  <td className='py-3 px-6'>{casee.confirmedcases}</td>
                  <td className='py-3 px-6'>{casee.confirmeddeaths}</td>
                  <td className='py-3 px-6'>{casee.totalcases}</td>
                  <td className='py-3 px-6'>{casee.totaldeaths}</td>
                  <td className='py-3 px-6'>{casee.cases_age0_9}</td>
                  <td className='py-3 px-6'>{casee.cases_age80_older}</td>
              </tr>
                )}
            </tbody>
          </table>
        </div>
        </div>
    </>
  )
}

Home.auth = true

export async function getServerSideProps() {
  const {data} = await axios.get('http://localhost:3000/api/covid');
  return {
    props: {
      dates: data?.map(cov => cov.date),
      data: data
    },
  };
}