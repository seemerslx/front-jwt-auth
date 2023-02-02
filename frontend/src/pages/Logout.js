import { redirect } from "react-router-dom";

export function action () {
    localStorage.removeItem('token');
    localStorage.removeItem("email");
    localStorage.removeItem("expiration");

    // also we are able to send post request to logout to delte token in our db
    return redirect("/");
};