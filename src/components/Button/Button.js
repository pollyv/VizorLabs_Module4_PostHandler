import React from "react";

import "./Button.css";

function Button({
                    type = "button",
                    disabled = false,
                    variant = "primary",
                    size = "medium",
                    onClick,
                    children,
                }) {
    return (
        <button
            className={`btn btn--${variant} btn--${size}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
