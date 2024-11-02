import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import './Upload.css';
//import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="upload-container">
      <label className="upload-label" htmlFor={name}>
        {label} {!viewData && <sup>*</sup>}
      </label>
      <div
        className={`upload-dropzone ${isDragActive ? 'upload-dropzone-active' : ''}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} ref={inputRef} className="upload-input-overlay" />

        {previewSource ? (
          <div className="upload-preview-container">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="upload-preview-image"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="upload-cancel-btn"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="upload-input-container"
            onClick={() => inputRef.current && inputRef.current.click()} // Trigger file browser
          >
            <div className="upload-icon-container">
              <FiUploadCloud className="upload-icon" />
            </div>
            <p className="upload-browse-text">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="upload-browse-highlight">Browse</span> a file
            </p>
            <ul className="upload-specs-list">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="upload-error">
          {label} is required
        </span>
      )}
    </div>
  );
}



// import { useEffect, useRef, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import './Upload.css'; // Import your CSS
// import "video-react/dist/video-react.css";
// import { Player } from "video-react";

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const { course } = useSelector((state) => state.course);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   );
//   const inputRef = useRef(null);

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       previewFile(file);
//       setSelectedFile(file);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: !video
//       ? { "image/*": [".jpeg", ".jpg", ".png"] }
//       : { "video/*": [".mp4"] },
//     onDrop,
//   });

//   const previewFile = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setPreviewSource(reader.result);
//     };
//   };

//   useEffect(() => {
//     register(name, { required: true });
//   }, [register, name]);

//   useEffect(() => {
//     setValue(name, selectedFile);
//   }, [selectedFile, setValue, name]);

//   return (
//     <div className="upload-container">
//       <label className="upload-label" htmlFor={name}>
//         {label} {!viewData && <sup>*</sup>}
//       </label>
//       <div
//         className={`upload-dropzone ${isDragActive ? 'upload-dropzone-active' : ''}`}
//         {...getRootProps()}
//       >
//         {previewSource ? (
//           <div className="upload-preview-container">
//             {!video ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="upload-preview-image"
//               />
//             ) : (
//               <Player aspectRatio="16:9" playsInline src={previewSource} />
//             )}
//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewSource("");
//                   setSelectedFile(null);
//                   setValue(name, null);
//                 }}
//                 className="upload-cancel-btn"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="upload-input-container">
//             <input {...getInputProps()} ref={inputRef} />
//             <div className="upload-icon-container">
//               <FiUploadCloud className="upload-icon" />
//             </div>
//             <p className="upload-browse-text">
//               Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//               <span className="upload-browse-highlight">Browse</span> a file
//             </p>
//             <ul className="upload-specs-list">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>
//       {errors[name] && (
//         <span className="upload-error">
//           {label} is required
//         </span>
//       )}
//     </div>
//   );
// }
