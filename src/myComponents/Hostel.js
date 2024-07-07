/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function Hostel() {
  const [data, setData] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const { owner } = useContext(Store);
  const handleDetail = (data) => {
    setSelectedHostel(data);
  };
  const [count] = useState(1);
  const fetchHostelData = async () => {
    try {
      const response = await fetch("https://ait-bnb-apis.vercel.app/getHostel");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const handleDelete = async (data) => {
    try {
      const response = await fetch(`https://ait-bnb-apis.vercel.app/getHostel/${data}`, {
        method: "DELETE",
      });

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        // Item deleted successfully, update state
        alert(jsonData.message);
        fetchHostelData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    fetchHostelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />

      <div className='container-fluid'>
        {" "}
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
            Manage Hostel
          </h1>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mb-3'>
            <table className='table table-dark table-bordered border-light'>
              <thead>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Hostel Name</th>
                  <th scope='col'>Hostel Rent</th>
                  <th scope='col'>Hostel Type</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>3D Model</th>
                  <th scope='col'>Update</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              {Array.isArray(data) ? (
                data
                  .filter((data) => data.owner === owner.ownerName)
                  .map((data, index) => (
                    <tbody className='table-group-divider'>
                      <tr key={data._id}>
                        <th scope='row'>{count + index}</th>
                        <td> {data.hostelName}</td>
                        <td> {data.hostelPrice}</td>
                        <td> {data.hostelType == "1" ? "Boys" : " Girls"}</td>
                        <td>
                          {" "}
                          <Link
                            className=' text-light'
                            to={data.image}
                            target='_blank'
                          >
                            Image
                          </Link>
                        </td>
                        <td>
                          {" "}
                          <Link
                            className=' text-light'
                            to={data.model}
                            target='_blank'
                          >
                            Model
                          </Link>
                        </td>
                        <td>
                          <button
                            className='btn btn-primary text-light fw-bold  btn-sm'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal'
                            onClick={() => handleDetail(data)}
                          >
                            Detail
                          </button>
                        </td>
                        <td>
                          <button
                            className='btn btn-danger text-light fw-bold btn-sm'
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <tbody>
                  <tr>
                    <td colspan='5'>No Data Found</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='exampleModalLabel'>
                Modal title
              </h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>
              {" "}
              <div className='CountryForm'>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Name
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelName : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Rent Per Month
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelPrice : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Location
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelLocation : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Hostel Contact
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelContact : ""}</p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelDescription : ""}</p>
                </div>
                <label for='example' className='form-label'>
                  Select Hostel Type
                </label>
                <p className="modalInformation">   {selectedHostel ? selectedHostel.hostelType : ""}</p>
                <label for='exampleImage' className='form-label'>
                  Image
                </label>
                <div className='input-group mb-3'>
                  {" "}
                  <Link
                    className=' text-dark modalInformation'
                    to={selectedHostel ? selectedHostel.image : ""}
                    target='_blank'
                  >
                    Image
                  </Link>
                </div>
                <label for='exampleImage' className='form-label'>
                  3D Model
                </label>
                <div className='input-group mb-3'>
                  {" "}
                  <Link
                    className=' text-dark modalInformation'
                    to={selectedHostel ? selectedHostel.model : ""}
                    target='_blank'
                  >
                    Image
                  </Link>
                </div>

              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='button' class='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
    </>
  );
}
