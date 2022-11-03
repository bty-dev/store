import ShopsAndScales from "./pages/ShopsAndScales/ShopsAndScales";
import ButtonBlack from "./components/UI/Buttons/ButtonBlack/ButtonBlack";
import ButtonStroke from "./components/UI/Buttons/ButtonStroke/ButtonStroke";
import SearchField from "./components/UI/SearchField/SearchField";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import { Routes, Route, Link } from "react-router-dom";
import OldScales from "./pages/OldScales/OldScales";
import { PageLayout } from "./components/PageLayout";
import { Login } from "./components/Auth/Login";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { loginRequest } from "./authConfig";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import {
  AuthenticationResult,
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import axios from "axios";

export interface ShopsAndScalesProps {
  Role: string;
  MarketCode: string;
  Name: string;
  Address: string;
  Scales: [
    {
      Id: number;
      MarketID: string;
      Type: string;
      Number: string;
      IP: string;
      Status: boolean;
      CategoryName: string;
    }
  ];
}
function App() {
  const [email, setEmail] = useState("");
  const [userdata, setUserdata] = useState<ShopsAndScalesProps>();

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);
  //
  // console.log(accounts);

  function ProfileContent() {
    const [graphData, setGraphData] = useState(null);
    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0].name;
    setEmail(accounts[0].username);
    console.log(accounts);
    const getRole = async () => {
      let response = await axios.get(`/GetRole?login=${accounts[0].username}`);
      // @ts-ignore
      setUserdata((prevState) => {
        if (JSON.stringify(prevState) === JSON.stringify(response.data)) {
          return prevState;
        }
        return response.data;
      });
    };
    getRole();

    function RequestProfileData() {
      const request = {
        ...loginRequest,
        account: accounts[0],
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance
        .acquireTokenSilent(request)
        .then((response: AuthenticationResult) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        })
        .catch((e: Error) => {
          instance
            .acquireTokenPopup(request)
            .then((response: AuthenticationResult) => {
              callMsGraph(response.accessToken).then((response) =>
                setGraphData(response)
              );
            });
        });
    }

    return (
      <>
        <h5 className="card-title">Email: {email}</h5>
        {
          graphData ? <ProfileData graphData={graphData} /> : null
          // <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
        }
      </>
    );
  }

  function ProtectedComponent() {
    const { instance, inProgress, accounts } = useMsal();
    const [apiData, setApiData] = useState(null);
    const [access, setAccess] = useState("");

    useEffect(() => {
      if (!apiData && inProgress === InteractionStatus.None) {
        const accessTokenRequest = {
          scopes: ["user.read"],
          account: accounts[0],
        };
        instance
          .acquireTokenSilent(accessTokenRequest)
          .then((accessTokenResponse) => {
            // Acquire token silent success
            let accessToken = accessTokenResponse.accessToken;
            setAccess(accessTokenResponse.accessToken);
            // Call your API with token
            // callApi(accessToken).then((response) => {
            //     setApiData(response);
            // });
          })
          .catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
              instance
                .acquireTokenPopup(accessTokenRequest)
                .then(function (accessTokenResponse) {
                  // Acquire token interactive success
                  let accessToken = accessTokenResponse.accessToken;
                  // Call your API with token
                  setAccess(accessTokenResponse.accessToken);
                  // @ts-ignore
                  callApi(accessToken).then((response) => {
                    setApiData(response);
                  });
                })
                .catch(function (error) {
                  // Acquire token interactive failure
                  console.log(error);
                });
            }
            console.log(error);
          });
        localStorage.setItem("token3", access);
      }
    }, [instance, accounts, inProgress, apiData]);

    return <p>Return your protected content here: {access}</p>;
  }

  return (
    // <div>
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
        <Routes>
          <Route path="/protected" element={<ProtectedComponent />} />
          <Route path="/" element={<ShopsAndScales userdata={userdata} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          {/*<Route path="/oldScales" element={ <OldScales />}/>*/}
        </Routes>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </UnauthenticatedTemplate>
    </PageLayout>
    // </div>
  );
}

export default App;
