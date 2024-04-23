import { useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import getX5C from '../util/getX5C';
import * as jose from 'jose'
import getRedirectUrl from '../util/getRedirectUrl';

const makeClientAssertion = async (certChain, privKey, targetId, clientId) => {
    const privateKey = await jose.importPKCS8(privKey, "RS256")

    const x5c = getX5C(certChain)
    if (x5c.length != 3) {
        return "ERROR"
    }

    const headers = {
        "alg": "RS256",
        "x5c": x5c,
    }

    const assertion = await new jose.SignJWT()
        .setProtectedHeader(headers)
        .setIssuedAt()
        .setIssuer(clientId)
        .setSubject(clientId)
        .setAudience(targetId)
        .setExpirationTime("2h")
        .sign(privateKey)

    return assertion
}

const Code = ({setTokens, certs}) => {

    const navigate = useNavigate()
    const [error, setError] = useState()

    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code')

    const exchangeCode = useCallback(async () => {

        const params = new URLSearchParams

        const clientAssertion = await makeClientAssertion(certs.certChain, certs.privKey, certs.idpEORI, certs.clientEORI)

        console.log('clientAssertion', clientAssertion)

        params.append('grant_type', 'authorization_code')
        params.append('redirect_uri', getRedirectUrl())
        params.append('client_id', certs.idpEORI)
        params.append('client_assertion', clientAssertion)
        params.append('code', code)

        const formBody = params.toString()

        const tokenUrl = `${certs.idpUrl}/protocol/openid-connect/token`

        fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            mode: 'cors',
            body: formBody,
        }).then(resp => {
            if (resp.status != 200) {
                throw new Error(`IDP status: ${resp.status}`)
            }
            return resp.json()
        }).then(resp => {
            setTokens(resp)
            navigate("/")
        }).catch(err => {
            console.error('err', err)
            setError(err.message)
        })
    }, [error])


    const backToRoot = () => {
        navigate("/")
    }

    return (
        <div>
            <h1>Code</h1>

            <h3></h3>
            {error ? `Error: ${error}` : code 
                ? <button className="btn-normal" onClick={exchangeCode}>Exchange code for token</button>
                : 'NO CODE PROVIDED'
            }
            <h1>
            <button className="btn-normal" onClick={backToRoot}>Go back</button>
            </h1>
        </div>

    )
}

export default Code;