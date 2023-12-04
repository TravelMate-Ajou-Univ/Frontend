import React, { ChangeEvent } from "react";
import CameraIcon from "../ui/icons/CameraIcon";

type Props = {
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function ProfileImageInput({
  handleImage,
  className = ""
}: Props) {
  return (
    <section className={className}>
      <label htmlFor="profile">
        <CameraIcon />
      </label>
      <input
        id="profile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImage}
      />
    </section>
  );
}
