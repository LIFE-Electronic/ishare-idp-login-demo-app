# iSHARE Login app for Keycloak

iSHARE App to simulate an OIDC Login flow for iSHARE using Keycloak. Please note that our iSHARE-enabled Keycloak fork must be
used (See:
[Repository](https://github.com/LIFE-Electronic/keycloak)).

## Installation

- npm install
- npm start

## Configuration

On the screen, you need to enter some parameters.

- Cert EORI: The EORI of the holder of your iSHARE certificate
- IDP EORI: The EORI of the Keycloak host. Should be the same as the
Keycloak client id.
- IDP URL: The full URL of your realm. Must not end with with a slash
  :-).
  
- Client Private Key: The full private key of your certificate
  (including `----BEGIN PRIVATE KEY-----` and `-----END PRIVATE
  KEY-----`).
- Client Certificate Chain. The full (!) certificate chain. Including
  all `-----BEGIN CERTIFICATE-----` etc.
  




