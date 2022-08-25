import { createPortal } from "react-dom";

export const Portal = (props) => {
    const portalElement = document.getElementById("portal-root");

    const dropDownStyle = {
        position: "absolute",
        zIndex: "30",
    };

    return (
        <>
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
