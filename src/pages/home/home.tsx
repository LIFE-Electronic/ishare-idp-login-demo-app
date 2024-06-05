import getBaseUrl from "../../util/getBaseUrl";
import { ISHARELogo } from "../../assets/ishare";
import styles from "./home.module.css";
import { ComponentProps } from "react";

function ISHAREButton(buttonProps: ComponentProps<"button">) {
  return (
    <button {...buttonProps} className={styles.ishareButton}>
      <ISHARELogo size={25} />
      Sign in with iSHARE
    </button>
  );
}

function SignIn({ backendUrl }: { backendUrl: string }) {
  const redirectUrl = encodeURIComponent(`${getBaseUrl()}`);

  return (
    <div>
      <div className={styles.signinCard}>
        <div>
          <h1 className={styles.signinCardHeader}>Sign in</h1>
          <p className={styles.signinCardDescription}>
            To access the clearing service you can sign in with iSHARE.
          </p>
        </div>
        <a
          className={styles.ishareLink}
          href={`${backendUrl}/connect/human/auth?redirect_uri=${redirectUrl}`}
        >
          <ISHAREButton />
        </a>
      </div>
    </div>
  );
}

function DisplayToken({ token }: { token: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    console.log("copying");
  };

  return (
    <div>
      <div className={styles.signinCard}>
        <div>
          <h1 className={styles.signinCardHeader}>Signed in</h1>
          <p className={styles.signinCardDescription}>
            Use the following access token to access the clearing service.
          </p>
        </div>
        <div className={styles.tokenContainer}>
          <pre className={styles.tokenPre}>{token}</pre>
        </div>
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  );
}

export function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const backendUrl = urlParams.get("backend_url") || "http://localhost:3000";

  return (
    <section className={styles.container}>
      {token ? (
        <DisplayToken token={token} />
      ) : (
        <SignIn backendUrl={backendUrl} />
      )}
    </section>
  );
}
