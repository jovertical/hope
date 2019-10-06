import React from 'react'
import App from 'next/app'
import '../styles/hope.css'

export default class Hope extends App {
    render(): React.ReactElement {
        const { Component, pageProps } = this.props

        return (
            <>
                <style global jsx>{`
                    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,700,800,900&display=swap');
                    body {
                        font-family: 'Open Sans', sans-serif;
                    }
                `}</style>

                <Component {...pageProps} />
            </>
        )
    }
}
