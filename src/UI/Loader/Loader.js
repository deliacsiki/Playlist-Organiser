import "./Loader.css";

const Loader = ({ loading }) => {
  var content = null;
  if (loading) content = <div className="loader">Loading...</div>;
  return content;
};

export default Loader;
