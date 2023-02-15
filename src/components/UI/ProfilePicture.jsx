const name = Math.random().toString(36).substring(7);

const ProfilePicture = ({ classPhoto, classAvatar, tabIndex }) => {
  return (
    <section
      tabIndex={tabIndex}
      className={`btn-ghost btn-circle avatar static bg-slate-300 ${classPhoto}`}
    >
      <img
        src={`https://robohash.org/${name}.webp`}
        alt=""
        className={`rounded-full ${classAvatar}`}
      />
    </section>
  );
};

export default ProfilePicture;
