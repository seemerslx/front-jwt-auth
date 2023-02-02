import { redirect } from "react-router-dom";

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    console.log("IN TOKEN DURATION", duration);
    return duration;
}

export function getAuthToken(){
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }
    const tokenDuration = getTokenDuration();

    console.log(tokenDuration);
    if(tokenDuration < 0){
        return "EXPIRED";
    }

    return token;
};

export function tokenLoader(){
    return getAuthToken();
};

export function getCredentials(){
    return localStorage.getItem("email");
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if (!token) {
        return redirect("/auth");
    }

    return null;
}