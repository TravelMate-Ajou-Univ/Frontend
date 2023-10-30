import { Bookmark } from "@/model/bookmark";

// import { useEffect } from "react";
// export const GoogleMap = () => {
//   useEffect(() => {
//     const initMap = () => {
//       const map = new google.maps.Map(
//         document.getElementById("map") as HTMLElement,
//         {
//           zoom: 17,
//           center: { lat: 37.5407622, lng: 127.0706095 }
//         }
//       );
//     };

//     if (typeof google !== "undefined") {
//       initMap();
//     }
//   }, []);
// };

export function calculateCenter(bookmarks: Bookmark[]) {
  let lat = 0;
  let lng = 0;

  for (let i = 0; i < bookmarks.length; i++) {
    lat += bookmarks[i].latitude;
    lng += bookmarks[i].longitude;
  }

  lat = lat / bookmarks.length;
  lng = lng / bookmarks.length;

  return { lat: lat, lng: lng };
}
