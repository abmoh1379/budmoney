import React from "react";
import {TailSpin} from 'react-loader-spinner';

const Loader = ({ spinerColor, spinnerWidth, spinnerHeight}) => {
    const customSpinnerColor = (spinerColor) ? spinerColor : '#01bf71';
    const customSpinnerWidth = (spinnerWidth) ? spinnerWidth : '80';
    const customSpinnerHeight = (spinnerHeight) ? spinnerHeight : '80';
    return (
        <TailSpin
        visible={true}
        height={customSpinnerHeight}
        width={customSpinnerWidth}
        color={customSpinnerColor}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        />
    );
}

export default Loader;