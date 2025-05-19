import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.status); // Or `user`

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    if (!authStatus) return null; // Hide if not logged in

    return (
        <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
            Logout
        </button>
    );
}


export default LogoutBtn
