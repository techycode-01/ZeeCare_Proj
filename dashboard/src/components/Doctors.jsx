import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [updatedDoctor, setUpdatedDoctor] = useState({});

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

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/v1/user/doctors/delete/${id}`,
          { withCredentials: true }
        );
        toast.success("Doctor deleted successfully!");
        fetchDoctors(); // Refresh the list
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setUpdatedDoctor(doctor);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/v1/user/doctors/update/${selectedDoctor._id}`,
        updatedDoctor,
        { withCredentials: true }
      );
      toast.success("Doctor details updated successfully!");
      setShowEditModal(false);
      fetchDoctors(); // Refresh the list
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setUpdatedDoctor({ ...updatedDoctor, [e.target.name]: e.target.value });
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) {
      setShowEditModal(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
                <span className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(element)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(element._id)}>Delete</button>
                </span>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>

      {showEditModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowEditModal(false)}>&times;</span>
            <section className="container add-doctor-form">
              <h1 className="form-title">EDIT DOCTOR DETAILS</h1>
              <form onSubmit={handleUpdate}>
                <div className="first-wrapper">
                  <div>
                    <img
                      src={
                        updatedDoctor.docAvatar && updatedDoctor.docAvatar.url
                      }
                      alt="Doctor Avatar"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={updatedDoctor.firstName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={updatedDoctor.lastName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="email"
                      value={updatedDoctor.email}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="phone"
                      value={updatedDoctor.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="nic"
                      value={updatedDoctor.nic}
                      onChange={handleChange}
                    />
                    <input
                      type={"date"}
                      name="dob"
                      value={updatedDoctor.dob ? updatedDoctor.dob.substring(0, 10) : ''}
                      onChange={handleChange}
                    />
                    <select
                      name="gender"
                      value={updatedDoctor.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <select
                      name="doctorDepartment"
                      value={updatedDoctor.doctorDepartment}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      {departmentsArray.map((depart, index) => {
                        return (
                          <option value={depart} key={index}>
                            {depart}
                          </option>
                        );
                      })}
                    </select>
                    <button type="submit" className="update-btn">Update</button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </section>
  );
};

export default Doctors;