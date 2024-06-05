import React, { useState, useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home/home";
import Code from "./component/Code";
import LowLevel from "./component/LowLevel";

const getCerts = () => {
  const defaultCertData = {
    idpEORI: "NL.EORI.LIFEELEC4DMI",
    idpUrl: "https://idp.dev.dexes.eu/realms/dmi_dexspace_smartcity",
    clientEORI: "<eori from certificate>",
    certEORI: "",
  };

  const data = localStorage.getItem("cert-data") || null;
  if (data == null) {
    return defaultCertData;
  }

  try {
    const parsedData = JSON.parse(data);
    if (parsedData.idpEORI == null || parsedData.idpEORI == "") {
      parsedData.idpEORI = defaultCertData.idpEORI;
    }
    if (parsedData.idpUrl == null || parsedData.idpUrl == "") {
      parsedData.idpUrl = defaultCertData.idpUrl;
    }
    if (parsedData.clientEORI == null) {
      parsedData.clientEORI = defaultCertData.clientEORI;
    }
    if (parsedData.certEORI == null) {
      parsedData.certEORI = defaultCertData.certEORI;
    }
    return parsedData;
  } catch {
    return defaultCertData;
  }
};

const App = () => {
  const [tokens, setTokens] = useState();
  const [certs, setCerts] = useState(getCerts());

  const setAndPersistCerts = useCallback(
    // @ts-ignore
    (certs) => {
      setCerts(certs);
      localStorage.setItem("cert-data", JSON.stringify(certs));
    },
    [setCerts, certs],
  );

  return (
    <Routes>
      <Route
        path="/lowlevel-hacker"
        element={
          <LowLevel
            tokens={tokens}
            setTokens={setTokens}
            certs={certs}
            setCerts={setAndPersistCerts}
          />
        }
      />
      <Route
        path="/lowlevel-hacker/code"
        element={<Code setTokens={setTokens} certs={certs} />}
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
//<!--<Route path="/" element={<Navigate to="dashboard" />} /><!--<Route path="/" element={<Navigate to="dashboard" />} />

export default App;
