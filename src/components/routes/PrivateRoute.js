import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUserId } from "../../slices/auth";


const PrivateRoute = ({ uid }) => {
    return (
        uid === null ? <Navigate to= '/login' /> : <Outlet />
    );
};


const mapStateToProps = (state) => {
    return {
        uid : selectUserId(state)
    }
}
export default connect(mapStateToProps)(PrivateRoute);