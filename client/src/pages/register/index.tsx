import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import styles from './register.module.scss';

export default function Register() {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    async function register() {        
        try{
            const payload = { name, email, password };
            const { data } = await axios.post("http://localhost:5000/users", payload);
            window.location.href = "/";
        }catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.form}>
                <img className={styles.image} src="/logo.svg" alt="Podcastr" />
                <form>
                    <h1>Faça seu cadastro</h1>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        placeholder="Nome de Usuário"
                        />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="Email"
                        />
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Senha"
                        type="password"
                    />

                    <button className={styles.button} onClick={() => register()} type="button">Salvar</button>
                </form>
            </section>
        </div>
    )
}
