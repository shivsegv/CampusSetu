import React from "react";

const FileUploader = ({ label, onChange }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input type="file" accept=".pdf" onChange={handleFile} />
    </div>
  );
};

export default FileUploader;
