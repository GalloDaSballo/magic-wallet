import { useState, FormEvent } from "react";
import { useLogin } from "../../context/UserContext";

const Signup = (): JSX.Element => {
    const [email, setEmail] = useState("");

    const login = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </form>
    );
};

export default Signup;
