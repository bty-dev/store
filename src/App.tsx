import ShopsAndScales from "./pages/ShopsAndScales/ShopsAndScales";
import ButtonBlack from "./components/UI/Buttons/ButtonBlack/ButtonBlack";
import ButtonStroke from "./components/UI/Buttons/ButtonStroke/ButtonStroke";
import SearchField from "./components/UI/SearchField/SearchField";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import {Routes, Route, Link} from "react-router-dom";
import OldScales from "./pages/OldScales/OldScales";
import { PageLayout } from "./components/PageLayout";
import { Login } from "./components/Auth/Login"
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from './services/ApiService'
import { loginRequest } from "./authConfig";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import {AuthenticationResult} from "@azure/msal-browser";

export interface ShopsAndScalesProps {
      Role: string,
      MarketCode: string,
      Name: string,
      Address: string,
      Scales: [
          {
              Id: number,
              MarketID: string,
              Type: string,
              Number: string,
              IP: string,
              Status: boolean,
              CategoryName: string
          }
      ]
  }
function App() {
  // const [email, setEmail] = useState('');
  const [userdata, setUserdata] = useState<ShopsAndScalesProps>();

  // 
  // console.log(accounts);
  
  function ProfileContent() {
    const [graphData, setGraphData] = useState(null);
    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0].name;
    // setEmail(accounts[0].username)
    console.log(accounts);
    const getRole = async () => {
      let response = await axios.get(`/GetRole?login=${accounts[0].username}`)
        // @ts-ignore
        setUserdata(prevState => {
          if (JSON.stringify(prevState) === JSON.stringify(response.data)) {
            return prevState
          }
          return response.data
        })
    }
    getRole()
    
    
    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response: AuthenticationResult) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e: Error) => {
            instance.acquireTokenPopup(request).then((response: AuthenticationResult) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }
    console.log(userdata);
    
    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};
  return (
    // <div>
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
        <Routes>
            <Route path="/" element={ <ShopsAndScales userdata={userdata} />}/>
            <Route path="/products" element={ <Products />}/>
            <Route path="/categories" element={ <Categories />}/>
            <Route path="/oldScales" element={ <OldScales />}/>
        </Routes>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Login />}/>
        </Routes>
      </UnauthenticatedTemplate>
    </PageLayout>
    // </div>
  );
}

export default App;
