// import React, { useEffect, useState } from "react";
// import { BiChevronDown } from "react-icons/bi";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { getCovidData } from "../actions/covidActions";

// const Selector = () => {

// const dispatch = useDispatch();
// const CovidData = useSelector(state => state.CovidData);
// const {loading, CovData, error} = CovidData;
// const [countries, setCountries] = useState(null);
// // const [dates, setDates] = useState([])
// const [inputValue, setInputValue] = useState("");
// const [selected, setSelected] = useState("");
// const [open, setOpen] = useState(false);
// let dates = [];
// //   setCountries(['soudan','lebanon','syria'])
//   useEffect(() => {
//     dispatch(getCovidData())
//   }, [dispatch]);

//   if(!loading){
//     CovData?.map(cov => dates.push(cov.date))
//   }
// //   console.log(dates)
  
//   return (
//     <div className="w-72 font-medium h-auto">
//       <div
//         onClick={() => setOpen(!open)}
//         className={`bg-white w-full p-2 flex items-center justify-between rounded ${
//           !selected && "text-gray-700"
//         }`}
//       >
//         {selected
//           ? selected?.length > 25
//             ? selected?.substring(0, 25) + "..."
//             : selected
//           : "Select Country"}
//         <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
//       </div>
//       <ul
//         className={`bg-white mt-2 overflow-y-auto ${
//           open ? "max-h-60" : "max-h-0"
//         } `}
//       >
//         <div className="flex items-center px-2 sticky top-0 bg-white">
//           <AiOutlineSearch size={18} className="text-gray-700" />
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value.toLowerCase())}
//             placeholder="Enter country name"
//             className="placeholder:text-gray-700 p-2 outline-none"
//           />
//         </div>
//         {dates?.map((country,index) => (
//           <li
//             key={index}
//             className={`p-2 text-sm hover:bg-sky-600 hover:text-white
//             ${
//               country?.toLowerCase() === selected?.toLowerCase() &&
//               "bg-sky-600 text-white"
//             }
//             ${
//               country?.toLowerCase().startsWith(inputValue)
//                 ? "block"
//                 : "hidden"
//             }`}
//             onClick={() => {
//               if (country?.toLowerCase() !== selected.toLowerCase()) {
//                 setSelected(country);
//                 setOpen(false);
//                 setInputValue("");
//               }
//             }}
//           >
//             {country}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Selector;