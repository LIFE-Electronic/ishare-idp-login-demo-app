import { jwtDecode } from 'jwt-decode'

const UserInfo = ({idToken, accessToken, userInfoToken}) => {
    if (!idToken) {
        return <div></div>
    }

    const tokenData = jwtDecode(idToken)

    const userInfoData = userInfoToken ? jwtDecode(userInfoToken) : []

    const copyToClipboard = (text) => async () => {
        await navigator.clipboard.writeText(text);
    }

    return (
        <div>
            <h2>Logged In</h2>
            <table >
                <tbody>
                    <tr>
                        <td style={{paddingRight: "50px", verticalAlign: "top"}}>
                            <h3>ID Token</h3>
                            <table>
                                <tbody>
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
                                </tbody>
                            </table>
                        </td>
                        <td style={{verticalAlign: "top"}}>
                            <h3>User Info</h3>
                            <table>
                                <tbody>
                                {
                                    Object.entries(userInfoData).map(([key, i]) => {
                                        return (
                                            <tr key={key}>
                                                <td style={{"textAlign": "left", "paddingRight": 25}}>{key}</td>
                                                <td style={{"textAlign": "left"}}>{String(i)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>Tokens</h2>
            <table>
                <tbody>
                    <tr>
                        <td>AccessToken</td>
                        <td><textarea disabled value={accessToken} cols="80"></textarea></td>
                        <td><button onClick={copyToClipboard(accessToken)}>Copy To Clipboard</button></td>
                    </tr>
                    <tr>
                        <td>IdToken</td>
                        <td><textarea disabled value={idToken} cols="80"></textarea></td>
                        <td><button onClick={copyToClipboard(idToken)}>Copy To Clipboard</button></td>
                    </tr>
                    <tr>
                        <td>UserInfoToken</td>
                        <td><textarea disabled value={userInfoToken != null ? userInfoToken : "<fetching>"} cols="80"></textarea></td>
                        <td><button onClick={copyToClipboard(userInfoToken)}>Copy To Clipboard</button></td>
                    </tr>
                </tbody>
            </table>
 
        </div>
    )
}

export default UserInfo;