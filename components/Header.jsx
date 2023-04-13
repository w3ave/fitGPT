import React from 'react'
import styles from '../styles/TopSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import GitHubButton from 'react-github-btn'
import logo from "../public/FITGPT.png"


const Header = () => {
    return (
        <>
            <div className={styles.topHeader}>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        width={100}
                        height={50}
                        className={styles.img}
                    />
                </Link>
                <GitHubButton href="https://github.com/w3ave/fitGPT" data-size="large" aria-label="Star w3ave/fitGPT on GitHub">Star</GitHubButton>
            </div>
        </>
    )
}

export default Header