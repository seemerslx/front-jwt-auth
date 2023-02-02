import { useEffect, useState} from "react";
import { redirect } from "react-router-dom";
import { checkAuthLoader, getCredentials } from "../util/auth";

const MePage = () => {
    const [email, setEmail] = useState(null);
    useEffect(() => {
        const storedEmail = getCredentials();
        if (!storedEmail) {
            return;
        }

        setEmail(storedEmail);
    }, [])
    return <>
        <section style={{textAlign: "center"}}>
            <h2>Email: {email}</h2>
        </section>
    </>
};

export function loader(){
    const res = checkAuthLoader();
    console.log("IN ME LOADER", res);
    if (res != null) {
        return redirect("/auth");
    }

    return null;
};

export default MePage;