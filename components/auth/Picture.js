import React, { useRef, useState } from "react";
export default function Picture({
  readablePicture,
  setPicture,
  setReadablePicture,
}) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const handleImage = (e) => {
    let pic = e.target.files[0];
    if (!pic) {
      setError("No file Selected !");
      return;
    }
    if (
      pic.type !== "image/jpg" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 7) {
      setError(`${pic.name} is too large, Max allowed size is 7 MB`);
      return;
    } else {
      setError("");
      setPicture(pic);
      // reading picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
    inputRef.current.click();
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture(Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="Profile_Photo"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="w-20 py-1 mt-2 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={handleChangePic}
          >
            Change
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload Picture
        </div>
      )}

      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpg,image/jpeg,image/webp"
        onChange={handleImage}
      ></input>
      {/* Errors */}
      {error !== "" ? (
        <div>
          <p className="mt-2 text-red-400">{error}</p>
        </div>
      ) : null}
    </div>
  );
}
