const name = Math.random().toString(36).substring(7);

const ProfilePicture = ({ classPhoto, classAvatar, tabIndex }) => {
  return (
    <section
      tabIndex={tabIndex}
      className={`avatar btn-circle btn-ghost static bg-slate-300 ${classPhoto}`}
    >
      <img
        src={`https://0ms.run/mirrors/robohash.org/${name}.webp`}
        alt=""
        className={`rounded-full ${classAvatar}`}
      />
    </section>
  );
};

export default ProfilePicture;
