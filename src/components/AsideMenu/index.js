import React from 'react'
import Link from 'next/link'
import './AsideMenu.scss'

class AsideMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
    this.aside = React.createRef()
  }

  closeMenu = e => {
    const goal = e.target.getAttribute('data-goal')
    const isMenuButton = this.aside.current.contains(e.target)

    if (
      !isMenuButton &&
      goal !== 'open-menu' &&
      this.state.open &&
      e.target !== this.aside.current
    ) {
      this.props.closeFn()
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { open: props.open }
  }

  componentDidMount() {
    document.addEventListener('click', this.closeMenu)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu)
  }

  render() {
    const { open } = this.state
    return (
      <aside ref={this.aside} className={(open && 'open') || ''}>
        <nav>
          <ul>
            <li>
              <Link prefetch href="/" as="/">
                <button className="btn">Телепрограмма</button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    )
  }
}

export default AsideMenu
