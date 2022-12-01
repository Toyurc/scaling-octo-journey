import axios from "axios";
import osmtogeojson from "osmtogeojson";


const url = "https://www.openstreetmap.org/api/0.6/map";
class OpenMapService {
  /**
   * 
   * @param minLong 
   * @param minLat 
   * @param maxLong 
   * @param maxLat 
   * @returns GEOJSON Data
   */
  static async getOSMBBoxData(minLong: string, minLat: string, maxLong: string, maxLat: string) {
    return axios.get(url, {
      params: {
        bbox: `${minLong},${minLat},${maxLong},${maxLat}`,
      }
    })
      .then(res => {
        return osmtogeojson(res.data)
      })
      .catch(error => {
        console.log("Error =>", error);
        return error;
      })
  }


  // Fixed issue with using fetch
  static async fetchOSMBBoxData(minLong: string, minLat: string, maxLong: string, maxLat: string) {
    return fetch(`https://www.openstreetmap.org/api/0.6/map?bbox=${minLong},${minLat},${maxLong},${maxLat}`,
      {
        method: 'GET',
      })
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(res => {
        return osmtogeojson(res);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }
}

export default OpenMapService;
