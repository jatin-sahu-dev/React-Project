import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [codingLanguage, setCodingLanguage] = useState("");
  const [file, setFile] = useState("");

  // Validation errors store karne ke liye
  const [errors, setErrors] = useState({});

  const [editIndex, setEditIndex] = useState(null);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function () {
        setFile(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  function deleteUser(index) {
    setUsers((prevUsers) =>
      prevUsers.filter((_, i) => i !== index)
    );
  }

  function editUser(index) {
    const user = users[index];

    console.log("Edit User:", user);
    console.log("Full Name:", user.fullName);
    console.log("Email:", user.email);
    console.log("Password:", user.password);
    console.log("Phone:", user.phone);
    console.log("Date of Birth:", user.dob);
    console.log("Gender:", user.gender);
    console.log("Address:", user.address);
    console.log("Coding Language:", user.codingLanguage);
    console.log("Image:", user.file);

    setEditIndex(index);

    setFullName(user.fullName);
    setEmail(user.email);
    setPassword(user.password);
    setPhone(user.phone);
    setDob(user.dob);
    setGender(user.gender);
    setAddress(user.address);
    setCodingLanguage(user.codingLanguage);
    setFile(user.file);

    // Edit karte time old errors hata do
    setErrors({});
  }

  // =========================================
  // VALIDATION FUNCTION
  // =========================================

  function validateForm() {
    // Empty object banaya
    const newErrors = {};

    // Full Name validation
    if (fullName.trim() === "") {
      newErrors.fullName = "Name is required";
    }

    // Email validation
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }

    // Password validation
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }

    // Phone validation
    if (phone.trim() === "") {
      newErrors.phone = "Phone is required";
    }

    // Date validation
    if (dob === "") {
      newErrors.dob = "Date of birth is required";
    }

    // Gender validation
    if (gender === "") {
      newErrors.gender = "Gender is required";
    }

    // Address validation
    if (address.trim() === "") {
      newErrors.address = "Address is required";
    }

    // Coding language validation
    if (codingLanguage === "") {
      newErrors.codingLanguage =
        "Please select a coding language";
    }

    // Image validation
    if (file === "") {
      newErrors.file = "Image is required";
    }

    // Errors ko state me save karna
    setErrors(newErrors);

    // Agar newErrors empty hai to true
    // Agar errors hain to false
    return Object.keys(newErrors).length === 0;
  }

  // =========================================
  // UPDATE USER
  // =========================================

  function updateUser() {
    // Validation call
    if (!validateForm()) {
      return;
    }

    const updatedUser = {
      fullName,
      email,
      password,
      phone,
      dob,
      gender,
      address,
      codingLanguage,
      file,
    };

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];

      updatedUsers[editIndex] = updatedUser;

      return updatedUsers;
    });

    setEditIndex(null);

    // Form reset
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob("");
    setGender("");
    setAddress("");
    setCodingLanguage("");
    setFile("");

    // Errors reset
    setErrors({});
  }

  // =========================================
  // REGISTER / SUBMIT
  // =========================================

  function handleSubmit(event) {
    event.preventDefault();

    // Validation call
    if (!validateForm()) {
      return;
    }

    const user = {
      fullName,
      email,
      password,
      phone,
      dob,
      gender,
      address,
      codingLanguage,
      file,
    };

    setUsers((prevUsers) => [...prevUsers, user]);

    // Form reset
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob("");
    setGender("");
    setAddress("");
    setCodingLanguage("");
    setFile("");

    // Errors reset
    setErrors({});
  }

  return (
    <>
      {/* ================= TABLE ================= */}

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Favorite Coding Language</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.fullName}</td>

                <td>{user.email}</td>

                <td>
                  {"*".repeat(user.password.length)}
                </td>

                <td>{user.phone}</td>

                <td>{user.dob}</td>

                <td>{user.gender}</td>

                <td>{user.address}</td>

                <td>{user.codingLanguage}</td>

                <td>
                  {user.file ? (
                    <img
                      src={user.file}
                      alt="User"
                      width="80"
                      height="80"
                      style={{
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => deleteUser(index)}
                    className="delete-btn"
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editUser(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FORM ================= */}

      <div className="form-container">
        <h2>User Registration</h2>

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="form-group">
            <label htmlFor="fullname">
              Full Name
            </label>

            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);

                // Error remove when user starts typing
                setErrors({
                  ...errors,
                  fullName: "",
                });
              }}
            />

            <p className="error">
              {errors.fullName}
            </p>
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                setErrors({
                  ...errors,
                  email: "",
                });
              }}
            />

            <p className="error">
              {errors.email}
            </p>
          </div>

          {/* PASSWORD */}

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors({
                  ...errors,
                  password: "",
                });
              }}
            />

            <p className="error">
              {errors.password}
            </p>
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);

                setErrors({
                  ...errors,
                  phone: "",
                });
              }}
            />

            <p className="error">
              {errors.phone}
            </p>
          </div>

          {/* DATE OF BIRTH */}

          <div className="form-group">
            <label htmlFor="dob">
              Date of Birth
            </label>

            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);

                setErrors({
                  ...errors,
                  dob: "",
                });
              }}
            />

            <p className="error">
              {errors.dob}
            </p>
          </div>

          {/* GENDER */}

          <div className="form-group">
            <label>Gender</label>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => {
                    setGender(e.target.value);

                    setErrors({
                      ...errors,
                      gender: "",
                    });
                  }}
                />

                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => {
                    setGender(e.target.value);

                    setErrors({
                      ...errors,
                      gender: "",
                    });
                  }}
                />

                Female
              </label>
            </div>

            <p className="error">
              {errors.gender}
            </p>
          </div>

          {/* ADDRESS */}

          <div className="form-group">
            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);

                setErrors({
                  ...errors,
                  address: "",
                });
              }}
            ></textarea>

            <p className="error">
              {errors.address}
            </p>
          </div>

          {/* CODING LANGUAGE */}

          <div className="form-group">
            <label htmlFor="language">
              Favorite Coding Language
            </label>

            <select
              id="language"
              name="language"
              value={codingLanguage}
              onChange={(e) => {
                setCodingLanguage(e.target.value);

                setErrors({
                  ...errors,
                  codingLanguage: "",
                });
              }}
            >
              <option value="">
                Select Language
              </option>

              <option value="C++">
                C++
              </option>

              <option value="C#">
                C#
              </option>

              <option value="JavaScript">
                JavaScript
              </option>

              <option value="Java">
                Java
              </option>

              <option value="Python">
                Python
              </option>
            </select>

            <p className="error">
              {errors.codingLanguage}
            </p>
          </div>

          {/* IMAGE */}

          <div className="form-group">
            <label htmlFor="file">
              Upload Image
            </label>

            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={(event) => {
                handleFileChange(event);

                setErrors({
                  ...errors,
                  file: "",
                });
              }}
            />

            <p className="error">
              {errors.file}
            </p>
          </div>

          {/* REGISTER BUTTON */}

          {editIndex === null && (
            <button type="submit">
              Register
            </button>
          )}

          {/* UPDATE BUTTON */}

          {editIndex !== null && (
            <button
              type="button"
              onClick={updateUser}
            >
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Form;