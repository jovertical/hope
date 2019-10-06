import React from 'react'

interface Props {
    children?: React.ReactNode
}

const Layout: React.FC = (props: Props): React.ReactElement => (
    <div>
        <main>{props.children}</main>
    </div>
)

export default Layout
