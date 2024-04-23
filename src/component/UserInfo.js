import { jwtDecode } from 'jwt-decode'

const UserInfo = ({idToken, accessToken}) => {
    if (!idToken) {
        return <div></div>
    }

    const tokenData = jwtDecode(idToken)
    console.log(tokenData)

    const copyToClipboard = (text) => async () => {
        await navigator.clipboard.writeText(text);
    }

    return (
        <div>
            <h3>Logged In</h3>
            <table>
                {
                    Object.entries(tokenData).map(([key, i]) => {
                        return (
                            <tr key={key}>
                                <td style={{"textAlign": "left", "paddingRight": 25}}>{key}</td>
                                <td style={{"textAlign": "left"}}>{String(i)}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td>AccessToken</td>
                    <td><textarea disabled defaultValue={accessToken} cols="80"></textarea></td>
                    <td><button onClick={copyToClipboard(accessToken)}>Copy To Clipboard</button></td>
                </tr>
                <tr>
                    <td>IdToken</td>
                    <td><textarea disabled defaultValue={idToken} cols="80"></textarea></td>
                    <td><button onClick={copyToClipboard(idToken)}>Copy To Clipboard</button></td>
                </tr>
            </table>

        </div>
    )
}

export default UserInfo;