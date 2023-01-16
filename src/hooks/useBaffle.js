import baffle from 'baffle';

const useBaffle = (classNameSelector) => {
  const newBaffle = () => {
    const target = baffle(classNameSelector);
    target.set({
      characters: '█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█<░▒ ▓/░>',
      speed: 120,
    });
    target.start();
    target.reveal(1000, 200);
    target.stop();
  };

  return { newBaffle };
};

export default useBaffle;
