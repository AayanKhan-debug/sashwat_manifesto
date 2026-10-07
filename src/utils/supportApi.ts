import axios from "axios";
import { getVisitorId } from "./supportStorage";

const API_URL = "http://localhost:5000/api/support";

export const getSupportCount = async () => {
  const response = await axios.get(API_URL);

  return response.data.count;
};

export const addSupport = async (
  name: string,
  departmentYear: string
) => {
  const visitorId = getVisitorId();

  const response = await axios.post(API_URL, {
    visitorId,
    name,
    departmentYear,
  });

  return response.data;
};