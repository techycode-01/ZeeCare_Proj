import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const departmentFees = {
    Pediatrics: 500,
    Orthopedics: 700,
    Cardiology: 1000,
    Neurology: 1200,
    Oncology: 1500,
    Radiology: 800,
    "Physical Therapy": 600,
    Dermatology: 750,
    ENT: 650,
  };

  useEffect(() => {
    setPaymentAmount(departmentFees[department]);
  }, [department]);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`,
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNic("");
    setDob("");
    setGender("");
    setAppointmentDate("");
    setDepartment("");
    setDoctorFirstName("");
    setDoctorLastName("");
    setHasVisited(false);
    setAddress("");
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    // Frontend Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointmentDate ||
      !department ||
      !doctorFirstName ||
      !doctorLastName ||
      !address
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (firstName.length < 3) {
      toast.error("First name must contain at least 3 characters.");
      return;
    }
    if (lastName.length < 3) {
      toast.error("Last name must contain at least 3 characters.");
      return;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please provide a valid email.");
      return;
    }
    if (phone.length !== 11) {
      toast.error("Phone number must contain exactly 11 digits.");
      return;
    }
    if (nic.length !== 13) {
      toast.error("NIC must contain exactly 13 digits.");
      return;
    }
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const appointmentData = {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        hasVisited: hasVisitedBool,
        address,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/post`,
        appointmentData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "ZeeCare",
        description: "Appointment Booking",
        order_id: data.order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          try {
            const verificationResponse = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/paymentverification`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );
            if (verificationResponse.data.success) {
              const confirmResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/confirm`,
                {
                  ...appointmentData,
                  razorpay_payment_id,
                  razorpay_order_id,
                },
                {
                  withCredentials: true,
                  headers: { "Content-Type": "application/json" },
                }
              );
              toast.success(confirmResponse.data.message);
              resetForm();
            }
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
        prefill: {
          name: firstName + " " + lastName,
          email: email,
          contact: phone,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={JSON.stringify({
                firstName: doctorFirstName,
                lastName: doctorLastName,
              })}
              onChange={(e) => {
                const { firstName, lastName } = JSON.parse(e.target.value);
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      firstName: doctor.firstName,
                      lastName: doctor.lastName,
                    })}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>Pay Now: ₹{paymentAmount}</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;