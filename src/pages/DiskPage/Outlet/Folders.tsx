import React, { ReactElement } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Files from "./Files.jsx";
import { DiskProps } from "../../../Types/Types.js";

const Folders = (props: DiskProps): ReactElement => {
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
