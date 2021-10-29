import React, { useEffect, useState } from "react";
import BodyContainer from "./Components/BodyContainer";
import Header from "./Components/Header";
import { Tost } from "./Components/Tost";
import "./index.css";
import { addUserData, getUser, getUserCount } from "./Services/axios";
import Moment from "moment";

function App() {
  const [user, setUser] = useState({ name: "", mobile: "" });
  const [addUser, setAddUser] = useState(false);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    handleUserCount();
  }, []);

  const handleUserCount = () => {
    getUserCount().then((data) => {
      console.log(data);
      setCount(data.data.count);
    });
  };

  const saveFile = (e) => {
    setFile(e.currentTarget.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSetAddUser = () => {
    setAddUser(!addUser);
    setSearchData(null);
    setUser({ name: "", mobile: "" });
    setUpload(false);
    setSearchTerm("");
  };

  const handleUpload = () => {
    setUpload(!upload);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getUser(searchTerm).then((data) => {
      if (data.data.code === 2) Tost(data.data.message, data.data.code);
      else {
        setSearchTerm("");
        const obj = {
          ...data.data[0],
          createdAt: Moment(data.data[0].createdAt).format("DD/M/YY"),
        };
        setSearchData(obj);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user, file, fileName);
    const { name, mobile } = user;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("name", name);
    formData.append("mobile", mobile);
    // const formData = { name, mobile, file, fileName };
    addUserData(formData).then((data) => {
      if (data.data.code === 1) {
        handleSetAddUser();
        setCount(count + 1);
        setSearchTerm("");
      }
      Tost(data.data.message, data.data.code);
    });
  };
  return (
    <div className="container">
      <Header>
        <button className="add_button" onClick={handleSetAddUser}>
          {addUser ? "Cancel" : "+ Add"}
        </button>
      </Header>
      <BodyContainer>
        <div className="d-flex justify-content-center">
          <div className="form_container">
            {addUser && (
              <form action="" className="form" onSubmit={handleSubmit}>
                <div className="form_head">ADD USER DETAILS</div>
                <div className="form_elements">
                  <input
                    type="text"
                    name="name"
                    className="input_item "
                    placeholder="Enter Name"
                    onChange={(e) => {
                      setUser((usr) => ({ ...usr, name: e.target.value }));
                    }}
                  />
                </div>
                <div className="form_elements">
                  <input
                    type="text"
                    name="mobile"
                    className="input_item "
                    placeholder="Enter Mobile Number"
                    onChange={(e) => {
                      setUser((usr) => ({ ...usr, mobile: e.target.value }));
                    }}
                  />
                </div>
                {upload ? (
                  <div className="form_elements">
                    <input type="file" onChange={saveFile} />
                  </div>
                ) : (
                  <div className="form_elements">
                    <button className="upload_img " onClick={handleUpload}>
                      Upload Picture
                    </button>
                  </div>
                )}
                <div className="form_elements">
                  <button className="submit_button">Submit</button>
                </div>
              </form>
            )}
            {!addUser && (
              <div className="">
                <div className="user_count">{`TOTAL USERS : ${count}`}</div>
                <form action="" className="form" onSubmit={handleSearch}>
                  <div className="form_head">FIND USER DETAILS</div>
                  <div className="form_elements">
                    <input
                      type="text"
                      name="mobile"
                      value={searchTerm}
                      className="input_item "
                      placeholder="Enter Mobile Number"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form_elements">
                    <button className="submit_button">Submit</button>
                  </div>
                  {searchData && (
                    <React.Fragment>
                      <div className="display_container">
                        <div className="display_text">{`NAME : ${searchData.name}`}</div>
                        <div className="display_text">{`MOBILE NUMBER : ${searchData.mobile}`}</div>
                        <div className="display_text">{`DATE OF REGISTRATION : ${searchData.createdAt}`}</div>
                      </div>
                      <div className="img_container">
                        <div className="img_head">PHOTO</div>
                      </div>
                      <div className="img_container">
                        <img src={searchData.url} alt="" className="img" />
                      </div>
                    </React.Fragment>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </BodyContainer>
    </div>
  );
}

export default App;
