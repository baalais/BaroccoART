// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router"; // Import useRouter to access the router

// interface ServicePageProps {
//   params: { slug: string }; // Get the slug from params directly
// }

// // Mapping of service titles and descriptions
// const serviceDetails = {
//   "privatmajas": {
//     title: "Privātmājas",
//     description: "Teksts par privātmājām teksts par privātmājām teksts par privātmājām teksts par privātmājām",
//   },
//   "lauksaimniecibas-ekas": {
//     title: "Lauksaimniecības ēkas",
//     description: "Teksts par lauksaimniecības ēkām teksts par lauksaimniecības ēkām teksts par lauksaimniecības ēkām",
//   },
//   "uznemumiem": {
//     title: "Uzņēmumiem",
//     description: "Teksts par uzņēmumiem teksts par uzņēmumiem teksts par uzņēmumiem teksts par uzņēmumiem",
//   },
//   "razosanas-uznemumiem": {
//     title: "Ražošanas uzņēmumiem",
//     description: "Teksts par ražošanas uzņēmumiem teksts par ražošanas uzņēmumiem teksts par ražošanas uzņēmumiem",
//   },
// };

// const ServicePage: React.FC<ServicePageProps> = ({ params }) => {
//   const { slug } = params; // Get slug directly from params

//   const serviceDetail = slug ? serviceDetails[slug as string] || null : null;

//   const [photos, setPhotos] = useState<string[]>([]);

//   useEffect(() => {
//     if (slug) {
//       const fetchPhotos = async () => {
//         try {
//           // Simulate fetching images from a folder in `public/images/services/[slug]`
//           const response = await fetch(`/api/photos?slug=${slug}`);
//           const data = await response.json();
//           setPhotos(data.photos || []);
//         } catch (error) {
//           console.error("Error fetching photos:", error);
//         }
//       };

//       fetchPhotos();
//     }
//   }, [slug]);

//   if (!serviceDetail) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-xl">
//           <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
//           <p className="text-gray-700">The requested service does not exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-8 px-4 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Title and description */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">{serviceDetail.title}</h1>
//           <p className="text-gray-600">{serviceDetail.description}</p>
//         </div>

//         {/* Photos grid */}
//         <div className="grid grid-cols-3 gap-4">
//           {photos.length > 0 ? (
//             photos.map((photo, index) => (
//               <div
//                 key={index}
//                 className="relative w-full h-48 bg-gray-200 overflow-hidden rounded-md"
//               >
//                 <img
//                   src={photo}
//                   alt={`Service photo ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No photos available for this service.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicePage;
