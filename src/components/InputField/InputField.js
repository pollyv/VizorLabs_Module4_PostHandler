import React from "react";

import "./InputField.css";

function InputField({
                        id,
                        label,
                        type = "text",
                        value,
                        onChange,
                        placeholder = "",
                        error = "",
                        textarea = false
                    }) {
    return (
        <div className="form__field">
            <label className="form__label" htmlFor={id}>
                {label}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    className={`input input--textarea ${error ? "input--error" : ""}`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    id={id}
                    className={`input ${error ? "input--error" : ""}`}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default InputField;
