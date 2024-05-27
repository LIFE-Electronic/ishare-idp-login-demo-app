import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import getX5C from "../util/getX5C";
import * as jose from "jose";
import getRedirectUrl from "../util/getRedirectUrl";

const makeAuthUrl = (baseUrl) => {
  return `${baseUrl}/protocol/openid-connect/auth`;
};

const Home = ({ tokens, setTokens, certs, setCerts }) => {
  //const location = useLocation()

  const [userInfoToken, setUserInfoToken] = useState();

  console.log(window.location.href);

  const navigate = useNavigate();

  const doLogin = async () => {
    const params = new URLSearchParams();

    // our client
    const clientId = certs.clientEORI;
    const scope = "openid ishare";
    const responseType = "code";
    const redirectUri = getRedirectUrl();

    const jwt_obj = {
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      response_type: responseType,
    };

    const privateKey = await jose.importPKCS8(certs.privKey, "RS256");

    const x5c = getX5C(certs.certChain);
    if (x5c.length != 3) {
      return;
    }

    const headers = {
      alg: "RS256",
      x5c: x5c,
    };

    const requestToken = await new jose.SignJWT(jwt_obj)
      .setProtectedHeader(headers)
      .setIssuedAt()
      // issuer is our client
      .setIssuer(certs.clientEORI)
      // audience is the idp
      .setAudience(certs.idpEORI)
      .setExpirationTime("30s")
      .sign(privateKey);

    console.log(requestToken);

    params.append("response_type", responseType);
    params.append("client_id", clientId);
    params.append("scope", scope);
    params.append("request", requestToken);

    const authUrl = makeAuthUrl(certs.idpUrl);

    window.location = `${authUrl}?${params.toString()}`;
  };

  const doLogout = () => {
    setTokens(null);
    navigate("/");
  };

  const saveCert = useCallback(
    (value) => {
      setCerts({
        ...certs,
        certChain: value,
      });
    },
    [certs, setCerts],
  );

  const savePrivKey = useCallback(
    (value) => {
      setCerts({
        ...certs,
        privKey: value,
      });
    },
    [certs, setCerts],
  );

  const saveIDPEori = useCallback(
    (value) => {
      setCerts({
        ...certs,
        idpEORI: value,
      });
    },
    [certs, setCerts],
  );

  const saveIDPURL = useCallback(
    (value) => {
      setCerts({
        ...certs,
        idpUrl: value,
      });
    },
    [certs, setCerts],
  );

  const saveClientEORI = useCallback(
    (value) => {
      setCerts({
        ...certs,
        clientEORI: value,
      });
    },
    [certs, setCerts],
  );

  const isButtonDisabled = !(
    certs.privKey &&
    certs.privKey.length > 0 &&
    certs.certChain &&
    certs.certChain.length > 0
  );

  if (tokens && tokens.access_token && !userInfoToken) {
    const infoUrl = `${certs.idpUrl}/protocol/openid-connect/userinfo`;
    fetch(infoUrl, {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })
      .then((resp) => resp.text())
      .then((token) => {
        setUserInfoToken(token);
      })
      .catch(console.error);
  }

  return (
    <div className="mdWrapper">
      <h1>Keycloak - iShare</h1>

      {tokens ? (
        <UserInfo
          idToken={tokens.id_token}
          accessToken={tokens.access_token}
          userInfoToken={userInfoToken}
        />
      ) : (
        "Not logged in"
      )}

      <h1 />
      {tokens ? (
        <button onClick={doLogout}>Logout</button>
      ) : (
        <button onClick={doLogin} disabled={isButtonDisabled}>
          Login
        </button>
      )}

      <h1>IDP Stuff</h1>
      <table>
        <tbody>
          <tr>
            <td style={{ paddingRight: "30px" }}>IDP EORI</td>
            <td>
              <textarea
                defaultValue={certs.idpEORI}
                cols="30"
                onChange={(e) => saveIDPEori(e.target.value)}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "25px" }}>IDP URL</td>
            <td>
              <textarea
                defaultValue={certs.idpUrl}
                cols="30"
                onChange={(e) => saveIDPURL(e.target.value)}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>Certificate Stuff</h1>
      <table>
        <tbody>
          <tr>
            <td style={{ paddingRight: "10px" }}>Client EORI</td>
            <td>
              <textarea
                defaultValue={certs.clientEORI}
                cols="30"
                onChange={(e) => saveClientEORI(e.target.value)}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Client Private Key</th>
            <th>Client Certificate Chain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                id="textarea-private-key"
                defaultValue={certs.privKey ? certs.privKey : ""}
                cols="50"
                rows="10"
                onChange={(e) => savePrivKey(e.target.value)}
              ></textarea>
            </td>
            <td>
              <textarea
                id="textarea-cert"
                defaultValue={certs.certChain ? certs.certChain : ""}
                cols="80"
                rows="10"
                onChange={(e) => saveCert(e.target.value)}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
