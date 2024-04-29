import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAppointments } from "../api";

interface Appointment {
  id: string;
  petName: string;
  ownerName: string;
  aptNotes: string;
  aptDate: string;
}
interface InitialState {
  appointments: Appointment[];
  status: "idle" | "loading" | "failed";
  error: string | undefined|null;
}

const initialState: InitialState = {
  appointments: [],
  status: "idle",
  error: null,
};



const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      console.log(action.payload, "added");
      state.appointments = [...state.appointments, action.payload];
    },
    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updateAppointment: (
      state,
      action: PayloadAction<Appointment>
    ) => {
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === action.payload.id ? action.payload : appointment
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "idle";
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addAppointment,
  deleteAppointment,
  updateAppointment,
} = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
