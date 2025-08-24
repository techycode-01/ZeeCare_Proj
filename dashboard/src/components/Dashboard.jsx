import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [registeredDoctors, setRegisteredDoctors] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [visitedFilter, setVisitedFilter] = useState("All");
  const [patientNameFilter, setPatientNameFilter] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/getall`,
          {
            withCredentials: true,
            params: {
              status: statusFilter,
              appointment_date: dateFilter,
              doctor: doctorFilter,
              department: departmentFilter,
              hasVisited: visitedFilter,
              patientName: patientNameFilter,
            },
          }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [statusFilter, dateFilter, doctorFilter, departmentFilter, visitedFilter, patientNameFilter]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/stats`,
          { withCredentials: true }
        );
        setTotalAppointments(data.totalAppointments);
        setRegisteredDoctors(data.registeredDoctors);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDoctorsAndDepartments = async () => {
      try {
        const { data: doctorsData } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`,
          { withCredentials: true }
        );
        setDoctors(doctorsData.doctors);
        const uniqueDepartments = [
          ...new Set(doctorsData.doctors.map((doc) => doc.doctorDepartment)),
        ];
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error("Error fetching doctors and departments:", error);
      }
    };
    fetchDoctorsAndDepartments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
    height: '40px',
    justifyContent: 'center',
    textAlign: 'center'
  };

  const thStyle = {
    padding: '0 5px',
  };

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Welcome to your ZeeCare Dashboard! Here you can manage appointments, view doctor information, and oversee the clinic's operations. Stay organized and efficient with all your essential tools in one place.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{totalAppointments}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{registeredDoctors}</h3>
          </div>
        </div>
        <div className="banner" style={{border: "1px solid #ccc", borderRadius: "10px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}}>
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Visited</th>
              </tr>
              <tr>
                <th style={thStyle}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={patientNameFilter}
                    onChange={(e) => setPatientNameFilter(e.target.value)}
                    style={inputStyle}
                  />
                </th>
                <th style={thStyle}><input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={inputStyle} /></th>
                <th style={thStyle}>
                  <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} style={inputStyle}>
                    <option value="">All Doctors</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={`${doc.firstName} ${doc.lastName}`}>
                        {`${doc.firstName} ${doc.lastName}`}
                      </option>
                    ))}
                  </select>
                </th>
                <th style={thStyle}>
                  <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={inputStyle}>
                    <option value="">All Departments</option>
                    {departments.map((dep) => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </th>
                <th style={thStyle}>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </th>
                <th style={thStyle}>
                  <select value={visitedFilter} onChange={(e) => setVisitedFilter(e.target.value)} style={inputStyle}>
                    <option value="All">All</option>
                    <option value="true">Visited</option>
                    <option value="false">Not Visited</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
