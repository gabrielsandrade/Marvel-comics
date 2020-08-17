import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logoMarvel.png';

import './styles.css';

export default function Header() {
    return(
        <header>
            <Link to='/'>
                <img src={logoImg} alt="Marvel"/>
            </Link>
        </header>
    )
}