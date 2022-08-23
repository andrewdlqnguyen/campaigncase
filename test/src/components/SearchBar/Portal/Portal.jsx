import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Portal = (props) => {
    const portalElement = document.getElementById("portal-root");

    // Don't delete this yet, this could be good use for backdrop - Andrew
    // const backDropStyle: React.CSSProperties = {
    //   position: "fixed",
    //   top: "0",
    //   left: "0",
    //   width: "100%",
    //   height: "100vh",
    //   zIndex: "20",
    //   backgroundColor: "rgb(0,0,0,0.20)"
    // };

    const dropDownStyle = {
      position: "absolute",
      backgroundColor: "white",
      color: "black",
      zIndex: "30",
    };

    return (
        <>
            {/* {createPortal(
                <div style={{ ...backDropStyle }} />,
                portalElement
            )} */}
            {createPortal(
                <div
                    style={{
                        ...dropDownStyle,
                        ...props.coords,
                    }}
                >
                    {props.children}
                </div>,
                portalElement
            )}
        </>
    );
};

// export default Portal;
