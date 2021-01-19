import { useState, FormEvent } from "react";
import { useLogin } from "../../context/UserContext";

import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
    const [email, setEmail] = useState("");

    const login = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(email);
    };

    return (
        <section className={styles.signup}>
            <h1>Magic Wallet</h1>
            <img src="images/main-image.svg" alt="Magic Wallet" />
            <span>Log in to your wallet</span>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                />

                <button type="submit">Log in</button>
            </form>
        </section>
    );
};

export default Signup;
