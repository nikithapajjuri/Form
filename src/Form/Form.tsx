import { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const table = () => {
    navigate("/table");
  };

  const handleSave = () => {
    const saveData = JSON.parse(localStorage.getItem("formDataList") || "[]");
    const updatedData = [...saveData, formData];
    localStorage.setItem("formDataList", JSON.stringify(updatedData));
    // Navigate to the table page
    navigate("/table");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    aadharCard: "",
    panCard: "",
    gender: "",
    phoneNumber: "",
    fatherName: "",
    motherName: "",
    education: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    aadharCard: "",
    panCard: "",
    gender: "",
    phoneNumber: "",
    fatherName: "",
    motherName: "",
    education: "",
    address: "",
  });

  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(?:\+91|91)?[6789]\d{9}$/; // Indian phone number regex
    return phoneRegex.test(phoneNumber);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    if (name === "panCard") {
      updatedValue = value.toUpperCase(); // Uppercase PAN card value
    }
  
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  
    if (name === "dob") {
      const calculatedAge = calculateAge(value);
      setFormData((prevData) => ({ ...prevData, dob: value, age: calculatedAge }));
    }
  };
  

  // Validate form data
  const validate = () => {
    const newErrors = { ...errors };

 // Validate required fields
Object.keys(formData).forEach((key) => {
  const typedKey = key as keyof typeof formData; // Assert key to the correct type
  if (!formData[typedKey]) {
    newErrors[typedKey] = `${typedKey.charAt(0).toUpperCase() + typedKey.slice(1)} is required`;
  } else {
    newErrors[typedKey] = ""; // Reset the error if the field is filled
  }
});

    // Additional custom validations
    if (formData.firstName && !/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only alphabets and spaces";
    }
    if (formData.firstName && formData.firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters long";
    }
    if (formData.lastName && !/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only alphabets and spaces";
    }
    if (formData.lastName && formData.lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters long";
    }
    if (formData.aadharCard && formData.aadharCard.length !== 12) {
      newErrors.aadharCard = "Aadhar card number must be 12 digits";
    }
    if (formData.panCard && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
      newErrors.panCard = "Invalid PAN card number format";
    }
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 18)) {
      newErrors.age = "Age must be a valid number and at least 18";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (formData.address && formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters long";
    }
    if (formData.motherName && !/^[a-zA-Z\s]+$/.test(formData.motherName)) {
      newErrors.motherName = "Mother's name must contain only alphabets and spaces";
    }

    if (formData.motherName && formData.motherName.length < 3) {
      newErrors.motherName = "Mother's name must be at least 3 characters long";
    }
    if (formData.fatherName && !/^[a-zA-Z\s]+$/.test(formData.fatherName)) {
      newErrors.fatherName = "Father's name must contain only alphabets and spaces";
    }
    if (formData.fatherName && formData.fatherName.length < 3) {
      newErrors.fatherName = "Father's name must be at least 3 characters long";
    }


    if (formData.education && formData.education.length < 3) {
      newErrors.education = "Education must be at least 3 characters long";
    }


    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (formData.phoneNumber.length !== 10 || !validatePhoneNumber(formData.phoneNumber)) {
  
         setErrors((prevErrors) => ({
          ...prevErrors,
           phoneNumber: "Please enter a valid Indian phone number."
        }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
          localStorage.setItem("prashu", JSON.stringify(formData));
          alert("Form data has been saved to localStorage");
          handleSave();
        }
      }
  
  

  };

  return (
    <div>
      <div className="button b">
        <button type="button" id="save" onClick={table}>
          Go To
        </button>
      </div>

      <div className="container">
        <h1>Indian Citizen Details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
          <br />

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
          <br />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          {errors.age && <span className="error">{errors.age}</span>}
          <br />

          <label htmlFor="aadharCard">Aadhar Card Number:</label>
          <input
            type="number"
            id="aadharCard"
            name="aadharCard"
            placeholder="Enter Aadhar Number"
            value={formData.aadharCard}
            onChange={handleInputChange}
            required
          />
          {errors.aadharCard && <span className="error">{errors.aadharCard}</span>}
          <br />

          <label htmlFor="panCard">Pan Card Number:</label>
          <input
            type="text"
            id="panCard"
            name="panCard"
            placeholder="Enter Pan Number"
            value={formData.panCard}
            onChange={handleInputChange}
            required
          />
          {errors.panCard && <span className="error">{errors.panCard}</span>}
          <br />

          <label htmlFor="gender">Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
            required
          /> Male
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
            required
          /> Female
          {errors.gender && <span className="error">{errors.gender}</span>}
          <br />

          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            rows={4}
            cols={50}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
          <br />

          <label htmlFor="fatherName">Father's Name:</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            required
          />
          {errors.fatherName && <span className="error">{errors.fatherName}</span>}
          <br />

          <label htmlFor="motherName">Mother's Name:</label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            required
          />
          {errors.motherName && <span className="error">{errors.motherName}</span>}
          <br />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            min="10"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          <br />

          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            required
          />
          {errors.education && <span className="error">{errors.education}</span>}
          <br />

          <button type="submit" id="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


export default Form;
