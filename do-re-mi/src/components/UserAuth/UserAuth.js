
import {Navigate} from "react-router";


const UserAuth = ({children}) => {
    const userIsLogged = !!localStorage.getItem('userInfo');

    return userIsLogged ? children : <Navigate to='/' />

}

export default UserAuth
