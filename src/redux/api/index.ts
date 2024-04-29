import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Appointment {
  id: string;
  petName: string;
  ownerName: string;
  aptNotes: string;
  aptDate: string;
}

const BASE_URL = "./data.json";

export const fetchAppointments:any = createAsyncThunk<Appointment[]>(
  "appointments/fetchAppointments",
  async () => {
    const { data } = await axios.get<Appointment[]>(BASE_URL);
    return data;
  }
);
