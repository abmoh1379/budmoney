import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUserId } from "../../slices/auth";


const PublicRoute = ({ uid }) => {
    return (
        uid === null ? <Outlet /> : <Navigate to = '/dashboard' replace = {true} /> 
    );
}

const mapStateToProps = (state) => {
    return {
        uid : selectUserId(state)
    }
}
export default connect(mapStateToProps)(PublicRoute);