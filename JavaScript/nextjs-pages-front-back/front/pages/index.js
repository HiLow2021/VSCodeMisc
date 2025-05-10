import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('GET');

    const title = 'Front Back Connection Sample';

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>{title}</h1>

                <div className={styles.content}>
                    <p>{count}</p>
                    <button
                        type="button"
                        onClick={async () => {
                            const response = await fetch('/api', {
                                method: 'GET'
                            });
                            const { text } = await response.json();

                            setText((_) => text);
                        }}
                    >
                        {text}
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            const response = await fetch('/api', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ count })
                            });
                            const body = await response.json();

                            setCount((_) => body.count);
                        }}
                    >
                        POST
                    </button>
                </div>
            </main>
        </div>
    );
}
