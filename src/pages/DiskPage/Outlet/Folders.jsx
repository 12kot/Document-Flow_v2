import React from "react";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import Files from "./Files";

const Folders = (props) => {
  props = useOutletContext();
  let { id } = useParams();
    props.folder = id ? id : "";
    
    const clearFolder = () => {
        props.folder = "";
    }

  return (
    <div>
      <NavLink to="/disk" onClick={() => clearFolder()}>{props.folder.replaceAll('+', '/')}</NavLink>

      <Files {...props} />
    </div>
  );
};

export default Folders;
