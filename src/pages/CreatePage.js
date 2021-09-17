import {useContext, useEffect, useState} from "react";
import AuthContext from "../store/AuthContext";
import useHttp from "../hooks/http.hook";
import {useHistory} from "react-router-dom";

const CreatePage = () => {
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const auth = useContext(AuthContext)
  const history = useHistory()

  const pressHandler = async event => {
    if (event.key === "Enter") {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`)
       } catch (e) {
        console.log(e.message)
      }
    }
  };

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter a link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
