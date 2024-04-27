import { useState } from 'react';
import getBaseUrl from '../util/getBaseUrl';


export function PolicyStore() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const [backendUrl, setBackendUrl] = useState("http://localhost:3000");
  const redirectUrl = encodeURIComponent(`${getBaseUrl()}/policy-store`);

  return (
    <section>
      <h1>Policy Store</h1>

      <form>
        <label>Backend url</label>
        <input value={backendUrl} onChange={e => setBackendUrl(e.target.value)}  />
      </form>

      <a href={`${backendUrl}/connect/human/auth?redirect_uri=${redirectUrl}`}>get access token</a>

      {
        token && (
          <div style={{ maxWidth: 440 }}>
            <h2>Token</h2>
            <pre style={{ overflowWrap: "break-word" }}>{token}</pre>
          </div>
        )
      }
    </section>
  )
}