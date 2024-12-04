import "./Avatars.scss";
import React, { FC } from 'react';

interface AvatarProps {
  avatar: string;
  name: string;
  role: string;
}

const Avatar: FC<AvatarProps> = ({ avatar, name, role }) => {
  return (
    <div className="avatar-image">
      <img src={avatar} alt={`${name}'s avatar`} className="review-avatar" />
      <div className="avatar-info">
        <p className="review-name">{name}</p>
        <p className="review-role">{role}</p>
      </div>
    </div>
  );
};

export default Avatar;