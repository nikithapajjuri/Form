import { useEffect, useState } from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";

function Table() {

  const navigate = useNavigate();
  const AddUser = () => {
    navigate("/")
  }

  const [formDataList, setFormDataList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage =5; // You can change this to any number you want to show per page


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formDataList") || "[]");
    setFormDataList(savedData);
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when new search is made
  };
  const filteredData = formDataList.filter((item) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      item.firstName.toLowerCase().includes(lowercasedQuery) ||
      item.lastName.toLowerCase().includes(lowercasedQuery) ||
      item.panCard.toLowerCase().includes(lowercasedQuery) ||
      item.phoneNumber.toLowerCase().includes(lowercasedQuery)
    );
  });
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentPageData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  return (



    <div className="container-table">
      <div className="button">

        <button type="button" id="save" onClick={AddUser}>AddNewUser</button>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search...."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div>
        <h1>Saved Citizen Details</h1>
        </div>
      </div>

      <table border={3}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Aadhar Card</th>
            <th>Pan Card</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Father's Name</th>
            <th>Mother's Name</th>
            <th>Education</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length > 0 ? (
            currentPageData.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.dob}</td>
                <td>{item.age}</td>
                
                <td>{item.aadharCard}</td>
                <td>{item.panCard}</td>
                <td>{item.gender}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>{item.fatherName}</td>
                <td>{item.motherName}</td>
                <td>{item.education}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}

        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>


  );
}

export default Table;
