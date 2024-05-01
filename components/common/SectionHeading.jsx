const SectionHeading = ({ title, tagline }) => (
  <>
    <div className="w-full flex items-center bg-black">
      <div className="w-3/12 flex items-center">
        <div className="w-2/12 h-1 bg-blue-300"></div>
        <div className="w-2/12 h-1 bg-pink-300"></div>
        <div className="w-2/12 h-1 bg-yellow-300"></div>
      </div>
      <div className="flex-1"></div>
    </div>
    <div className="w-full mt-5 text-left">
      <h2 className="text-4xl lg:text-5xl font-extrabold uppercase">{title}</h2>
      <p className="uppercase mt-2">{tagline}</p>
    </div>
  </>
);
export default SectionHeading;
