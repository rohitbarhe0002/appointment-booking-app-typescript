import React, { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";

interface Props {
  onSendAppointment: (appointment: AppointmentInfo) => void;
  lastId: number;
}

interface AppointmentInfo {
  id: string;
  petName: string;
  ownerName: string;
  aptNotes: string;
  aptDate: string;
  aptTime?: string,

}

const AddAppointment: React.FC<Props> = ({ onSendAppointment, lastId }) => {
  const clearData: AppointmentInfo = {
    id: "",
    petName: "",
    ownerName: "",
    aptNotes: "",
    aptDate: "",
    aptTime: "",
  };

  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<AppointmentInfo>(clearData);

  const formDataPosted = () => {
    if (formData.petName && formData.ownerName && formData.aptDate) {
      const appointmentInfo: AppointmentInfo = {
        id: (lastId + 1).toString(),
        petName: formData.petName,
        ownerName: formData.ownerName,
        aptNotes: formData.aptNotes,
        aptDate: formData.aptDate + " " + formData.aptTime,
      };
      onSendAppointment(appointmentInfo);
      setFormData(clearData);
      setToggleForm(!toggleForm);
    } else {
      alert("fill required fields");
    }
  };

  return (
    <div>
      <button
        onClick={() => setToggleForm(!toggleForm)}
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left  ${toggleForm ? "rounded-t-md" : "rounded-md"
          }`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top" /> Add
          Appointment
        </div>
      </button>
      {toggleForm && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          {/* Rest of your form */}
        </div>
      )}
    </div>
  );
};

export default AddAppointment;
