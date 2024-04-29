import React, { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Search from "./components/Search";
import { fetchAppointments } from "./redux/api";
import { addAppointment, deleteAppointment } from "./redux/slices/appointmentSlice";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<any>("petName");
  const [orderBy, setOrderBy] = useState<string>("asc");
  const { appointments } = useSelector((state: RootState) => state.appointments);
  const dispatch = useDispatch();

  const filteredAppointments = appointments
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a: any, b: any) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order;
    });

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <>
      <div className="App container mx-auto mt-3 font-thin">
        <h1 className="text-5xl mb-4">
          <BiCalendar className="inline-block text-red-400 align-top" />
          Your Appointments
        </h1>
        <AddAppointment
          onSendAppointment={(appointment) => dispatch(addAppointment(appointment))}
          lastId={appointments.reduce(
            (pre, curr) => (Number(curr.id) > pre ? Number(curr.id) : pre),
            0
          )}
        />
        <Search
          query={query}
          onQueryChange={(event: any) => {
            setQuery(event.target.value);
          }}
          orderBy={orderBy}
          onOrderByChange={(val: string) => {
            setOrderBy(val);
          }}
          sortBy={sortBy}
          onSortBYChange={(val: string) => {
            setSortBy(val);
          }}
        />
        <ul className="divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => {
            return (
              <AppointmentInfo
                onDeleteAppointment={(appointmentId: string) => dispatch(deleteAppointment(appointmentId))}
                appointment={appointment}
                key={appointment.id}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
