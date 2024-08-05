"use client";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

export default function Home() {
  const cld = new Cloudinary({ cloud: { cloudName: "dltsmhfit" } });
  const [show, isShow] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [url, setURL] = useState("");
  const [imgData, setImgData] = useState();
  const handleUpload = async () => {
    setIsDisable(false);
    const data = new FormData();
    data.append("file", imgData);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dltsmhfit");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dltsmhfit/image/upload",
        data
      );
      setURL(res.data.secure_url);
      setIsDisable(true);
      isShow(true);
    } catch (error) {
      setIsDisable(true);
      console.log("error", error.message);
    }
  };

  const hanldeCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Copied");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <main className={styles.main}>
      <h1>Upload your Images Here</h1>
      <div className="form">
        <input type="file" onChange={(e) => setImgData(e.target.files[0])} />
        {isDisable ? (
          <button className="btn" onClick={handleUpload}>
            Upload
          </button>
        ) : (
          <button className="btn" disabled>
            Please wait...
          </button>
        )}
      </div>
      <br />
      <br />
        {{url}}
    </main>
  );
}
