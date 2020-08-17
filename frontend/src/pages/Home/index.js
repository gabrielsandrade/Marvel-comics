import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { apiParams } from '../../services/api';
import queryString from 'query-string';

import './styles.css';

export default function Home (props) {
    const [comics, setComics] = useState([]);
    const query = queryString.parse(props.location.search);
    const page = parseInt(query.page) || 1;
    const previewsDisabled = (page === 1);
    apiParams.page = page;
    useEffect(() => {
        api.get('comics', {
            params: apiParams,
        })
        .then(response => {
            setComics(response.data);
        })
    }, [page])

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
                <Link to={`/?page=${(page) - 1}`}>
                    <button className="button" disabled={previewsDisabled}>
                        Página anterior
                    </button>
                </Link>
                <Link to={`/?page=${(page) + 1}`}>
                    <div className="button">
                        Próxima Página
                    </div>
                </Link>
            </div>
        </div>
    )
}