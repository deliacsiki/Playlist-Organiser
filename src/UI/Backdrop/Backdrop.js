import { Button } from "@material-ui/core";
import cssClasses from "./Backdrop.module.css";

const Backdrop = ({ children, toggleBackdrop }) => (
  <div className={cssClasses.BackdropBackground}>
    <div className={cssClasses.BackdropContent}>
      <Button onClick={toggleBackdrop}>X</Button>
      {children}
    </div>
  </div>
);

export default Backdrop;
