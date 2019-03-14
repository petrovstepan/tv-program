import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import {UserAgent} from "@quentin-sommer/react-useragent";

const MobileLayout = dynamic(() => import('./Mobile'))
const DesktopLayout = dynamic(() => import('./Desktop'))


const Layout = ({ children, title }) => (
    <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <UserAgent mobile>
            {
                m => m ? (
                    <MobileLayout>
                        {children}
                    </MobileLayout>
                ) : (
                    <DesktopLayout>
                        {children}
                    </DesktopLayout>
                )
            }
        </UserAgent>
    </React.Fragment>
)

export default Layout