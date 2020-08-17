import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { apiParams } from '../../services/api';
import './styles.css';

export default function Home () {
    const [comics, setComics] = useState([]);
    useEffect(() => {
        api.get('comics', {
            params: apiParams,
        })
        .then(response => {
            setComics(response.data);
            console.log(comics);
        })
    }, [])


    return (
        <div className="home-container">
            <div className="comic-search">
                <input placeholder="Pesquisar revista"/>
                <button>Pesquisar</button>
            </div>
            <ul className="comic-list">
                {(comics).map(comic => (
                    <li className="comic-item" key={comic.id}>
                        <Link to='/'>
                            <img src={comic.thumbnail.path + "/portrait_xlarge." + comic.thumbnail.extension} alt="Cover img" height={260}/>
                            <div className="comic-infos">
                                <p className="title">{ comic.title }</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <Link to='/'>
                    <div className="button">
                        Página anterior
                    </div>
                </Link>
                <Link to='/'>
                    <div className="button">
                        Próxima Página
                    </div>
                </Link>
            </div>
        </div>
    )
}