import { useContext, useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import AuthContext from "../store/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      console.log(data);
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Auth Page</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  id="email"
                  type="text"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  id="password"
                  type="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Email</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: "1rem" }}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
