import {useCallback, useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/http.hook";
import AuthContext from "../store/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched)
    } catch (e) {
      console.log(e.message)
    }
  }, [token, request, linkId]);

  useEffect(() => {
    getLink().then()
  },[getLink])

  if(loading){
    return <Loader />
  }

  return (
    <>
      {!loading && link && <LinkCard link={link}/> }
    </>
  );
};

export default DetailPage;
