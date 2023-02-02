import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import jwt from "jwt-decode";
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  console.log("IN ACTION", request);
  const searchParams = new URL(request.url).searchParams;
  const data = await request.formData();
  console.log("Form data", data);

  const mode = searchParams.get('mode');
  console.log("MODE = ", mode);

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  console.log(data);

  const authData = {
    email: data.get('email'),
    password: data.get('password')
  };

  const resp = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData),
  });

  if (resp.status === 422 || resp.status === 401) {
    return resp;
  }

  if (!resp.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const resData = await resp.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  //  так можна, але той бекенд повертає фігню по експерейшину, тому я вручну поставлю ескп
  // const dataToken = jwt(token);
  // localStorage.setItem("email", dataToken.email);
  // localStorage.setItem("exp", dataToken.exp);

  const dataToken = jwt(token);
  localStorage.setItem("email", dataToken.email);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  return redirect("/");
};