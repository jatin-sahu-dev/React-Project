import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const file = form.file.files[0];

    // If image is uploaded
    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        const user = {
          fullName: form.fullname.value,
          email: form.email.value,
          password: form.password.value,
          phone: form.phone.value,
          dob: form.dob.value,
          gender: form.gender.value,
          address: form.address.value,
          codingLanguage: form.language.value,
          file: reader.result,
        };

        setUsers((prevUsers) => [...prevUsers, user]);

        console.log("New User:", user);
        console.log("All Users:", [...users, user]);

        form.reset();
      };

      // Convert image to Base64
      reader.readAsDataURL(file);
    } else {
      // If no image is uploaded
      const user = {
        fullName: form.fullname.value,
        email: form.email.value,
        password: form.password.value,
        phone: form.phone.value,
        dob: form.dob.value,
        gender: form.gender.value,
        address: form.address.value,
        codingLanguage: form.language.value,
        file: "",
      };

      setUsers((prevUsers) => [...prevUsers, user]);

      console.log("New User:", user);

      form.reset();
    }
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
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.fullName}</td>

                <td>{user.email}</td>

                {/* Password shown as stars */}
                <td>{"*".repeat(user.password.length)}</td>

                <td>{user.phone}</td>

                <td>{user.dob}</td>

                <td>{user.gender}</td>

                <td>{user.address}</td>

                <td>{user.codingLanguage}</td>

                {/* Base64 Image */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FORM ================= */}
      <div className="form-container">
        <h2>User Registration</h2>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullname">
              Full Name
            </label>

            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"

            />
          </div>

          {/* Email */}
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"

            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob">
              Date of Birth
            </label>

            <input
              type="date"
              id="dob"
              name="dob"

            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>
              Gender
            </label>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"

                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                />
                Female
              </label>

            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"

            ></textarea>
          </div>

          {/* Coding Language */}
          <div className="form-group">
            <label htmlFor="language">
              Favorite Coding Language
            </label>

            <select
              id="language"
              name="language"

            >
              <option value="">
                Select Language
              </option>

              <option value="cpp">
                C++
              </option>

              <option value="csharp">
                C#
              </option>

              <option value="javascript">
                JavaScript
              </option>

              <option value="java">
                Java
              </option>

              <option value="python">
                Python
              </option>
            </select>
          </div>

          {/* Upload Image */}
          <div className="form-group">
            <label htmlFor="file">
              Upload Image
            </label>

            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!email || !password}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;