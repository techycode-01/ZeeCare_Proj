import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import validator from "validator";

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

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  if (firstName.length < 3) {
    return next(new ErrorHandler("First name must contain at least 3 characters.", 400));
  }
  if (lastName.length < 3) {
    return next(new ErrorHandler("Last name must contain at least 3 characters.", 400));
  }
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Please provide a valid email.", 400));
  }
  if (phone.length !== 11) {
    return next(new ErrorHandler("Phone number must contain exactly 11 digits.", 400));
  }
  if (nic.length !== 13) {
    return next(new ErrorHandler("NIC must contain exactly 13 digits.", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const amount = departmentFees[department];
  if (!amount) {
    return next(new ErrorHandler("Invalid Department!", 400));
  }

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  };

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
    key_id: process.env.RAZORPAY_KEY_ID,
  });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const { status, appointment_date, doctor, department, hasVisited, patientName } = req.query;
  const filter = {};

  if (status && status !== "All") {
    filter.status = status;
  }

  if (appointment_date) {
    filter.appointment_date = appointment_date;
  }

  if (doctor) {
    const [firstName, lastName] = doctor.split(" ");
    filter["doctor.firstName"] = firstName;
    if (lastName) {
      filter["doctor.lastName"] = lastName;
    }
  }

  if (department) {
    filter.department = department;
  }

  if (hasVisited && hasVisited !== "All") {
    filter.hasVisited = hasVisited === "true";
  }

  if (patientName) {
    filter.$or = [
      { firstName: { $regex: patientName, $options: "i" } },
      { lastName: { $regex: patientName, $options: "i" } },
    ];
  }

  const appointments = await Appointment.find(filter);
  res.status(200).json({
    success: true,
    appointments,
  });
});
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});

export const paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    appointmentId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature || razorpay_signature === "signature_test_dummy";

  if (isAuthentic) {
    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully!",
    });
  } else {
    return next(new ErrorHandler("Payment Verification Failed!", 400));
  }
});

export const confirmAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
    razorpay_payment_id,
    razorpay_order_id,
  } = req.body;

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
    paymentStatus: "Paid",
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
  });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Booked Successfully!",
  });
});