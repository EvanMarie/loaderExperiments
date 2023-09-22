export default function EONET() {
  return <div>APOD</div>;
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_KEY } from "~/routes/nasa";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   HStack,
//   Input,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import APODCard from "./apodCard";
// import {
//   ButtonStyles,
//   Colors,
//   inputFieldStyles,
//   inputLabelStyles,
//   inputStackStyles,
//   scrollBarStyles,
// } from "~/style";
// import { Form } from "@remix-run/react";

// type APODResponse = {
//   title: string;
//   date: string;
//   media_type: "image" | "video";
//   url: string;
//   explanation: string;
// };

// export default function APOD() {

//   const [dailyData, setDailyData] = useState<APODResponse | null>(null);
//   const [queriedData, setQueriedData] = useState<APODResponse[] | null>(null); // array for queried data
//   const API_URL = "https://api.nasa.gov/planetary/apod";
//   const [inputDate, setInputDate] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [count, setCount] = useState("6");
//   // const [thumbs, setThumbs] = useState(false);

//   useEffect(() => {
//     axios
//       .get(API_URL, {
//         params: {
//           api_key: API_KEY,
//         },
//       })
//       .then((response) => {
//         setDailyData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching daily APOD data:", error);
//       });
//   }, []);

//   const fetchData = () => {
//     const params: any = {
//       api_key: API_KEY,
//     };

//     if (inputDate) {
//       params.date = inputDate;
//     }
//     if (startDate) {
//       params.start_date = startDate;
//     }
//     if (endDate) {
//       params.end_date = endDate;
//     }
//     if (count) {
//       params.count = count;
//     }
//     // if (thumbs) {
//     //   params.thumbs = thumbs;
//     // }

//     axios
//       .get(API_URL, { params })
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setQueriedData(response.data);
//         } else {
//           setQueriedData([response.data]); // single result is treated as a one-item array
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching queried APOD data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetchData();
//   };

//   if (!dailyData) return <p>Loading...</p>;

//   return (
//     <VStack spacing={4} w="100%">
//       <Form onSubmit={handleSubmit}>
//         <VStack
//           spacing={4}
//           bg={Colors.myDark}
//           w="100%"
//           p={4}
//           color={Colors.myLight}
//         >
//           {" "}
//           <HStack w="100%">
//             <FormControl>
//               <VStack {...inputStackStyles} spacing={0}>
//                 <FormLabel {...inputLabelStyles}>Specify Date: </FormLabel>
//                 <Input
//                   type="date"
//                   value={inputDate}
//                   onChange={(e) => setInputDate(e.target.value)}
//                   {...inputFieldStyles}
//                 />
//               </VStack>
//             </FormControl>
//             <FormControl>
//               <VStack {...inputStackStyles}>
//                 <FormLabel {...inputLabelStyles}>Specify Count:</FormLabel>
//                 <Input
//                   type="number"
//                   value={count}
//                   onChange={(e) => setCount(e.target.value)}
//                   {...inputFieldStyles}
//                 />
//               </VStack>
//             </FormControl>
//           </HStack>
//           <VStack spacing={0}>
//             <Text {...inputLabelStyles}>Specify Date Range:</Text>
//             <HStack w="100%">
//               <FormControl>
//                 <VStack w="100%">
//                   <HStack {...inputStackStyles}>
//                     <FormLabel {...inputLabelStyles}>Start</FormLabel>
//                     <Input
//                       type="date"
//                       value={startDate}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       {...inputFieldStyles}
//                     />
//                   </HStack>
//                 </VStack>
//               </FormControl>
//               <FormControl>
//                 <HStack {...inputStackStyles}>
//                   <FormLabel {...inputLabelStyles}>End</FormLabel>
//                   <Input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     {...inputFieldStyles}
//                   />
//                 </HStack>
//               </FormControl>
//             </HStack>
//           </VStack>
//           <Button type="submit" mt={4} {...ButtonStyles}>
//             Get Images
//           </Button>
//         </VStack>
//       </Form>
//       <Box w="100%" overflowX="auto" rounded="none" {...scrollBarStyles}>
//         <HStack spacing={0} rounded="none" py={4}>
//           {queriedData &&
//             queriedData.map((item, idx) => <APODCard key={idx} data={item} />)}
//         </HStack>
//       </Box>
//     </VStack>
//   );
// };
