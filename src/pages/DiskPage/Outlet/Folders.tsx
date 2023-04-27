import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import Files from "./Files";

const Folders = (): ReactElement => {
  let { id } = useParams();
    
  return (
    <div>
      <Files folder={id ? id : ""} />
    </div>
  );
};

export default Folders;
