import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import styles from './home.module.scss';

export default function Login() {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const login = async () => {
        try { 
            const payload = { email, password }
            const { data } = await axios.post('http://localhost:5000/auth/login', payload);
            window.location.href = '/list-episodes';
         } catch (err) {
             console.log(err);
         }
    }

    return (
        <div className={styles.container}>
            <section className={styles.form}>
                <img className={styles.image} src="/logo.svg" alt="Podcastr" />
                <form>
                    <h1>Faça seu logon</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="Email"
                        />
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Senha"
                    />
                    <button className={styles.button} onClick={login} type="button">
                        Entrar
                    </button>
                    <button className={styles.button} onClick={() => window.location.href = "/register"}  type="button">Cadastrar</button>
                </form>
            </section>
        </div>
    )
}
