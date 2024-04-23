import { jwtDecode } from 'jwt-decode'

const UserInfo = ({idToken, accessToken}) => {
    if (!idToken) {
        return <div></div>
    }

    const tokenData = jwtDecode(idToken)
    console.log(tokenData)

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
                    <td><textarea defaultValue={accessToken} cols="110"></textarea></td>
                </tr>
                <tr>
                    <td>IdToken</td>
                    <td><textarea defaultValue={idToken} cols="110"></textarea></td>
                </tr>
            </table>

        </div>
    )
}

export default UserInfo;