import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { apiParams } from '../../services/api';
import queryString from 'query-string';

import './styles.css';

export default function Home (props) {
    const [comics, setComics] = useState([]);
    const [prevButton, setPrevButton] = useState(true);
    const [nextButton, setNextButton] = useState(true);

    const query = queryString.parse(props.location.search);
    const page = parseInt(query.page) || 1;
    apiParams.page = page;
    let totalPages = 0;
    
    useEffect(() => {
        api.get('comics', {
            params: apiParams,
        })
        .then(response => {
            const totalComics = response.data.total;
            const modTotalPages = totalComics % 10;
            totalPages = (modTotalPages === 0) ? parseInt(totalComics / 10) : parseInt(totalComics / 10) + 1;
            setComics(response.data.results);
            setPrevButton(page === 1);
            setNextButton(totalPages === page);
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
                <a href={`/?page=${(page) - 1}`}>
                    <button className="button" disabled={prevButton}>
                        Página anterior
                    </button>
                </a>
                <a href={`/?page=${(page) + 1}`}>
                    <button className="button" disabled={nextButton}>
                        Próxima Página
                    </button>
                </a>
            </div>
        </div>
    )
}