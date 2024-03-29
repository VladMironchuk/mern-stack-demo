import {Redirect, Route, Switch} from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";

const useRoutes = isAuth => {
  if(isAuth){
    return (
      <Switch>
        <Route path="/links">
          <LinksPage/>
        </Route>
        <Route path="/create">
          <CreatePage/>
        </Route>
        <Route path="/detail/:id">
          <DetailPage/>
        </Route>
        <Redirect to="/create"/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default useRoutes