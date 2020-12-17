import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {
    const [activeItem, setActiveItem] = useState('home');//adding home into the useState set the ui active default to home

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu pointing secondary>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </Menu>
    )
}

export default MenuBar;