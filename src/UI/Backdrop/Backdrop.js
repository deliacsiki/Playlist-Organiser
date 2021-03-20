import cssClasses from "./Backdrop.module.css";

const Backdrop = ({ children, toggleBackdrop }) => (
  <div className={cssClasses.BackdropBackground} onClick={toggleBackdrop}>
    <div className={cssClasses.BackdropContent}>{children}</div>
  </div>
);

export default Backdrop;
