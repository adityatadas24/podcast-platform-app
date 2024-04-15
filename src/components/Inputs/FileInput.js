import React, { useState } from "react";

const FileInput = ({ type, accept, id, functionInput, text, style }) => {
  const [filteredFile, setFilteredFile] = useState("");

  function onchange(e) {
    setFilteredFile(e.target.files[0].name);
    functionInput(e.target.files[0]);
  }
  return (
    <div className="hi">
      <div className="inputs-fields" style={{textAlign:'left'}}>
      <label htmlFor={id} className="inputs-fields1" >
        {filteredFile ? `file Selected ${filteredFile} was here` : text}
      </label>
      <input
        style={{display:"none" }}
        type="file"
        accept={accept}
        id={id}
        onChange={onchange}
      />
      </div>
      
    </div>
  );
};

export default FileInput;
