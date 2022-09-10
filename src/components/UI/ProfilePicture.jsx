import React from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';

const ProfilePicture = ({ classPhoto, classAvatar, tabIndex }) => {
  const configMan = genConfig({
    sex: 'man',
    faceColor: '#AC6651',
    earSize: 'big',
    eyeStyle: 'smile',
    noseStyle: 'short',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'none',
    hairColor: '#000',
    hairStyle: 'thick',
    hatStyle: 'none',
    hatColor: '#FC909F',
    eyeBrowStyle: 'up',
    shirtColor: '#9287FF',
    bgColor: '#F48150',
  });

  // const configWoman = genConfig({
  //   sex: 'woman',
  //   faceColor: '#AC6651',
  //   earSize: 'small',
  //   eyeStyle: 'oval',
  //   noseStyle: 'long',
  //   mouthStyle: 'peace',
  //   shirtStyle: 'hoody',
  //   glassesStyle: 'none',
  //   hairColor: '#FC909F',
  //   hairStyle: 'womanLong',
  //   hatStyle: 'none',
  //   hatColor: '#D2EFF3',
  //   eyeBrowStyle: 'up',
  //   shirtColor: '#9287FF',
  //   bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)',
  // });

  return (
    <section
      tabIndex={tabIndex}
      className={`avatar btn-circle btn-ghost static ${classPhoto}`}
    >
      <Avatar className={`-z-50 rounded-full ${classAvatar}`} {...configMan} />
    </section>
  );
};

export default ProfilePicture;
