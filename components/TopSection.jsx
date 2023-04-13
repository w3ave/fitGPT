import React from 'react';
import styles from '../styles/TopSection.module.css';
import Link from 'next/link';
import Header from './Header';
import Button from './Button';


const TopSection = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p>Loose weight,<span> and change your life</span> with AI</p>
                </div>
                <div className={styles.description}>
                    <p>Let AI develop an end-end plan for you to reach your weight loss goals. Loving what the plan has done with you so far? Share it with a friend.</p>
                </div>
                <Link href="/generate">
                    <Button text={"Try it for free"} />
                </Link>
                <span>No Email. No Signup.</span>
            </div>
        </div>
    )
}

export default TopSection