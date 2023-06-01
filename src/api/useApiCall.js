import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const apiBaseUrl = "http://localhost:8100/api";

export const getUserDashboardUrl = () => {
    let userType = localStorage.getItem('userType');
    if (userType === null)
        return '/login';

    if (userType === 'USER') {
        return '/user-profile';
    } else if (userType === 'ORGANIZATION') {
        return '/organization-dashboard';
    } else if (userType === 'ADMIN') {
        return '/admin-profile';
    }
    return '/login';
}

export const handleLogout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    localStorage.removeItem('organizationId');

    localStorage.removeItem('displayData');
    navigate('/login');
}

const useApiCall = (service) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        service()
            .then((data) => {
                setData(data.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    return [loading, data, error]
}

export default useApiCall;