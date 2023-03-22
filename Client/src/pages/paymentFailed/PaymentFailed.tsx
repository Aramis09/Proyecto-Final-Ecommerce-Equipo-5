import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const PaymentFailed = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }, [])

    return(
    <div>
        <h1>Sadly there was an error, so no purchase was made.</h1>
        <h2>Redirecting to Home page.</h2>
    </div>
    )
}