import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Files from "./Files";

const Folders = (props) => {
  props = useOutletContext();
  let { id } = useParams();
    props.folder = id ? id : "";
    
  return (
    <div>
      <Files {...props} />
    </div>
  );
};

export default Folders;
