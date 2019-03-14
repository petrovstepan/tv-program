import React from 'react'
import './MobileLayout.scss'
import AsideMenu from '../../AsideMenu'


class MobileLayout extends React.Component {
    state = {
        menuOpen: false
    }

    closeFn = () => this.setState({menuOpen: false})

    openMenu = (e) => this.setState({menuOpen: true})

    render() {
        return (
            <div className="app mobile">
                <header>
                    <div className="header-wrapper">
                        <button onClick={this.openMenu} data-goal="open-menu" className="btn">Меню</button>
                    </div>
                </header>
                <AsideMenu closeFn={this.closeFn} open={this.state.menuOpen}/>
                <main>
                    {this.props.children}
                </main>
                <footer></footer>
            </div>
        )
    }
}


export default MobileLayout