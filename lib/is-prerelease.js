const isPrerelease = ({type, main}) =>
  type === 'prerelease' || (type === 'release' && !main);

export default isPrerelease;
