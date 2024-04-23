import { jwtDecode } from 'jwt-decode'

const UserInfo = ({idToken}) => {
    if (!idToken) {
        return <div></div>
    }

    const tokenData = jwtDecode(idToken)
    console.log(tokenData)

    return (
        <div>
            <h3>UserInfo</h3>
            <table>
                {
                    Object.entries(tokenData).map(([key, i]) => {
                        return (
                            <tr key={key}>
                                <td style={{"textAlign": "left", "paddingRight": 25}}>{key}</td>
                                <td style={{"textAlign": "left"}}>{i}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default UserInfo;