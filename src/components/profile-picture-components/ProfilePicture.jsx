import React, { useState } from "react";
import PictureForm from "./PictureForm";
import PictureContainer from "./Profile-selection-component";

const ProfilePicture = () => {
  const [newImage, setNewImage] = useState();
  const handleNewImage = () => {
    setNewImage(newImage);
  };

  return (
    <div>
      <PictureContainer newImage={newImage}></PictureContainer>
      <PictureForm handleNewImage={handleNewImage}></PictureForm>
    </div>
  );
};

export default ProfilePicture;
