import React from 'react'
import './DesktopLayout.scss'
import Link from 'next/link'

const DesktopLayout = ({ children }) => (
    <div className="app desktop">
        <header>
            <div className="header-wrapper">
                <nav>
                    <ul>
                        <li>
                            <Link prefetch href="/" as="/">
                                <a><button className="btn">Телепрограмма</button></a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <div className="content-wrapper">
                {children}
            </div>
        </main>
        <footer></footer>
    </div>
)

export default DesktopLayout