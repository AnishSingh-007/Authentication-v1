import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import "./Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "./Logout";
// import TestSeries from "./TestSeries"

const Home = () => {
  //1. register email -> email verification model (home) -> set password -> goal -> mobile model (home) -> otp -> home
  //2. register mobile -> otp -> goal -> email model (home) -> email verification model (home) -> set password -> home
  //3. register login -> forgot password -> email verification model (home) -> set password -> home
  const navigate = useNavigate();
  const showLocation = useLocation();
  const { state } = showLocation;
  const [openEmailModel, setOpenEmailModel] = useState(false);
  const [openEmailVerificationModel, setOpenEmailVerificationModel] =
    useState(false);
  const [openMobileModel, setOpenMobileModel] = useState(false);
  const [enableEmailBtn, setEnableEmailBtn] = useState(false);
  const [enableMobileBtn, setEnableMobileBtn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(state.email);
  const [mobile, setMobile] = useState(state.mobile);
  const [modelType, setModelType] = useState(state.modelType);

  useEffect(() => {
    console.log("SHOW LOCATION", showLocation);
    if (modelType !== undefined && modelType !== "" && modelType == "email") {
      console.log("1 " + modelType);
      setOpenEmailModel(true);
    } else if (
      modelType !== undefined &&
      modelType !== "" &&
      modelType == "mobile"
    ) {
      console.log("2 " + modelType);
      setOpenMobileModel(true);
    } else if (
      modelType !== undefined &&
      modelType !== "" &&
      modelType == "email-verification"
    ) {
      console.log("3 " + modelType);
      setOpenEmailVerificationModel(true);
    } else {
      console.log("4 " + modelType);
    }
  }, [modelType]);

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const fetchEmailApi = async () => {
    //sent email and close email dialog and open verification model
    // setOpenEmailModel(false)
    // handleOpenEmailVerificationModel()
    try {
      let data = {
        email_id: email,
        mobile_number: mobile,
        full_name: fullName,
      };
      console.log("DATA", data);
      let url = "http://localhost:5000/email-verification-mobile-fullname";
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const jsonData = await response.json();
        console.log("JSON Data:", jsonData);
        console.log("status " + jsonData.status);
        if (jsonData.status === "success") {
          //show verification model
          setOpenEmailModel(false);
          setOpenEmailVerificationModel(true);
          // handleOpenEmailVerificationModel()
        } else {
          //failed to sent email
          console.log("failed to sent email");
        }
      } else {
        console.log("Response Error:", response.statusText);
      }
    } catch (err) {
      console.log("Error fetching data:");
      console.error(err);
    }
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
    if (e.target.value.length > 0 && email.length > 0 && isEmail(email)) {
      setEnableEmailBtn(true);
    } else {
      setEnableEmailBtn(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (
      e.target.value.length > 0 &&
      fullName.length > 0 &&
      isEmail(e.target.value)
    ) {
      setEnableEmailBtn(true);
    } else {
      setEnableEmailBtn(false);
    }
  };

  const handleMobile = (e) => {
    setMobile(e.target.value.slice(0, 10));
    if (e.target.value.length >= 10 && fullName.length > 0) {
      setEnableMobileBtn(true);
    } else {
      setEnableMobileBtn(false);
    }
  };

  const fetchMobileApi = async () => {
    try {
      let data = {
        email_id: email,
        mobile_number: mobile,
        full_name: fullName,
      };
      let url = "http://localhost:5000/mobile-verification-email-fullname";
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const jsonData = await response.json();
        console.log("JSON Data:", jsonData);
        console.log("status " + jsonData.status);
        if (jsonData.status === "success") {
          //show verification model
          setOpenMobileModel(false);

          navigate("/", {
            state: {
              route: "otp",
              email: email,
              mobile: mobile,
              otp: jsonData.otp,
            },
           }
           );

          //handleOpenEmailVerificationModel()
        } else {
          //failed to sent email
          console.log("failed to sent email");
        }
      } else {
        console.log("Response Error:", response.statusText);
      }
    } catch (err) {
      console.log("Error fetching data:");
      console.error(err);
    }
  };

  return (
    <div>
      {/* <TestSeries/> */}
    {( modelType === "" ) &&
          <Logout />
    }
      {/*  */}
      <ReactModal
        isOpen={openEmailVerificationModel}
        contentLabel="Minimal Modal Example"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div>
          <span className="sign-up-span">Sign-up incomplete !</span>
          <span className="email-span">email verification</span>
          <span className="email-id-span">{email}</span>
          <span className="instruction-span">
            We have sent you verification email in your email ID {email}
          </span>
          <span className="instruction-span">
            Check your email inbox and verify it.
          </span>
        </div>
      </ReactModal>

      {/* EMAIL OVERLAY */}
      <ReactModal
        isOpen={openEmailModel}
        contentLabel="Minimal Modal Example"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div>
          <span className="sign-up-span">Sign-up incomplete !</span>

          <input
            onChange={handleFullName}
            value={fullName}
            className="name-input"
            type="text"
            placeholder="Enter complete name"
          />

          <input
            onChange={handleEmail}
            value={email}
            className="name-input"
            type="text"
            placeholder="Enter email address"
          />

          <button
            onClick={fetchEmailApi}
            className={
              "continue-button-" + (enableEmailBtn ? "enable" : "disable")
            }
            type="submit"
          >
            continue
          </button>
        </div>
      </ReactModal>

      {/* MOBILE OVERLAY */}
      <ReactModal
        isOpen={openMobileModel}
        contentLabel="Minimal Modal Example"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div>
          <span className="sign-up-span">Sign-up incomplete !</span>

          <input
            onChange={handleFullName}
            value={fullName}
            className="name-input"
            type="text"
            placeholder="Enter complete name"
          />

          <input
            onChange={handleMobile}
            value={mobile}
            className="name-input"
            type="number"
            placeholder="Enter mobile number"
          />

          <button
            onClick={fetchMobileApi}
            className={
              "continue-button-" + (enableMobileBtn ? "enable" : "disable")
            }
            type="submit"
          >
            continue
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Home;
