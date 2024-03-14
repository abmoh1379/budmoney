import React from "react";

const MainElement = ({children, className}) => {
    const customClassName = className ? className : '';
    return (
        <main className={customClassName}>
            {children}
        </main>
    );
}

export default MainElement;