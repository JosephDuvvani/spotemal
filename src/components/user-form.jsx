import { useContext, useState } from "react";
import MapContext from "../pages/game/context";
import { useNavigate } from "react-router-dom";

const UserForm = ({time}) => {
    const [username, setUserName] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const {game} = useContext(MapContext);
    const id = game?.mapId;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.trim() === '') {
            setError('Please enter a valid name');
            return;
        }
        const apiUrl = import.meta.env.VITE_SPOTEMAL_API_URL;
        const url = `${apiUrl}/maps/${id}/scorer`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                scorer: {
                    username,
                    time
                }
            })
        }
        
        fetch(url, options)
            .then(() => {
                navigate('/', {replace: true});
            })
    }

    return (
        <div>
           <form
            onSubmit={handleSubmit}
            className="user-form"
           >
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your name"
                    autoComplete="off"
                    className="text-input user-form__username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                />
                <button type="submit" className="btn">SUBMIT</button>
            </form>
            {error && <p className="user-form__error">{error}</p>}
        </div>
    )
}

export default UserForm;