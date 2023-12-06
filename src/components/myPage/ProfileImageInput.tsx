import React, { ChangeEvent } from "react";

type Props = {
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: React.ReactNode;
};

export default function ImageInput({
  handleImage,
  className = "",
  children
}: Props) {
  return (
    <section className={className}>
      <label htmlFor="profile">{children}</label>
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
