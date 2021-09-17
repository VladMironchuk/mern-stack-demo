import {useCallback, useContext, useEffect, useState} from "react";
import useHttp from "../hooks/http.hook";
import AuthContext from "../store/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const [links, setLinks] = useState([]);

  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link/', "GET", null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {
      
    }
  }, [token, request])

  useEffect(() => {
    fetchLinks().then()
  }, [fetchLinks])

  if(loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links}/>}
    </>
  );
};

export default LinksPage;
