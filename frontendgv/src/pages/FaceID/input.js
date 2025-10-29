import { useRef, useState, useEffect } from "react";
import CameraCapture from "./test";
import FaceRecognition from "./testnhandien";
import "../../components/Layout/Sidebar.css";
import "../../pages/FaceID/input.css";
import { useLocation } from "react-router-dom";

function Input() {
    const [showCamera, setShowCamera] = useState(false);
    const [showFaceRecognition, setShowFaceRecognition] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hideForm, setHideForm] = useState(false);
    const inputRef = useRef(null);
    const location = useLocation();
    const selectedSubject = location.state?.selectedSubject || "Không có môn học";
    // console.log("Môn học:", selectedSubject);

    function handleClick(event, action) {
        event.preventDefault();
        const value = inputRef.current?.value;

        if (!value && action !== "confirm") {
            setErrorMessage("Vui lòng nhập thông tin đầy đủ!");
            return;
        }
        setErrorMessage("");

        if (action === "register") {
            setShowCamera(true);
            setShowFaceRecognition(false);
            setHideForm(true);
        } else if (action === "confirm") {
            setShowCamera(false);
            setShowFaceRecognition(true);
            setHideForm(true);
        }
    }

    useEffect(() => {
        console.log("showCamera:", showCamera);
        console.log("showFaceRecognition:", showFaceRecognition);
    }, [showCamera, showFaceRecognition]);

    return (
        <>
        <div className="container-wrapper">
            {!hideForm && (
                <form className="container">
                    <img src={require("../../pages/FaceID/student.png")} alt="icon" className="icon" />

                    <input
                        ref={inputRef}
                        type="number"
                        placeholder="Nhập MSSV..."
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                    />
                    <div className="button">
                        <button className ="btnDk" onClick={(e) => handleClick(e, "register")}>
                            Đăng Ký
                        </button>
                        <button className="btnDk" onClick={(e) => handleClick(e, "confirm")}>
                            Điểm Danh
                        </button>
                    </div>
                    {/* <div className="flex gap-10 mt-5">
                        <button onClick={(e) => handleClick(e, "register")} className="w-auto px-5 py-2 bg-blue-600 text-white rounded-md">
                            Đăng Ký
                        </button>
                        <button onClick={(e) => handleClick(e, "confirm")} className="w-auto px-3 py-2 bg-blue-600 text-white rounded-md">
                            Điểm Danh
                        </button>
                    </div> */}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    
                </form>
            )}
            {showCamera && <CameraCapture key="camera" valueInput={inputRef.current?.value} />}
            {showFaceRecognition && <FaceRecognition key="face" selectedSubject={selectedSubject} />}


        </div>
        </>
    );
}

export default Input;
