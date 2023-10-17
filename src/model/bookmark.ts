export type Bookmark = {
  lat: number;
  lng: number;
  season?: string;
  memo?: string;
};

export function calculateCenter(bookmarks: Bookmark[]) {
  let lat = 0;
  let lng = 0;

  for (let i = 0; i < bookmarks.length; i++) {
    lat += bookmarks[i].lat;
    lng += bookmarks[i].lng;
  }

  lat = lat / bookmarks.length;
  lng = lng / bookmarks.length;

  return { lat: lat, lng: lng };
}
