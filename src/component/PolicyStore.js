import { useState } from 'react';
import getBaseUrl from '../util/getBaseUrl';


export function PolicyStore() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const [backendUrl, setBackendUrl] = useState("http://localhost:3000");
  const redirectUrl = encodeURIComponent(`${getBaseUrl()}/policy-store`);

  console.log(redirectUrl)
  console.log(token)

  const copyToClipboard = (text) => async () => {
    await navigator.clipboard.writeText(text);
}

  return (
    <section>
      <h1>Policy Store</h1>

      <form>
        <label style={{"paddingRight": "20px"}}>Backend url</label>
        <input value={backendUrl} onChange={e => setBackendUrl(e.target.value)}  />
      </form>

      <a href={`${backendUrl}/connect/human/auth?redirect_uri=${redirectUrl}`}>get access token</a>

      {
        token && (
          <div style={{ maxWidth: 440 }}>
            <h2>Token</h2>
            <textarea disabled cols="50" value={token}></textarea>
            <br></br>
            <button onClick={copyToClipboard(token)}>Copy</button>
          </div>
        )
      }
    </section>
  )
}