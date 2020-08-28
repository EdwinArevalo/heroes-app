import React from 'react';
import queryString from 'query-string'; 
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { useMemo } from 'react';

export const SearchScreen = ({history}) => {

    const location = useLocation(); 
    //=> '?q=bar'
     
    const {q=''} = queryString.parse(location.search); 
    
    
    const [values, handleInputChange] = useForm({
        searchText: q
    });
    
    const {searchText} = values;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`); 
    }


    return (
        <div>
            <h1>Sarch Screen</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete="off"
                            placeholder="Find your hero"
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-block btn-outline-info mt-1"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                    {
                        (q === '')
                            &&
                        <div className="alert alert-light animate__animated animate__fadeIn">
                            Search a hero
                        </div>
 
                    }

                    {
                        ( q !== '' && heroesFiltered.length === 0)
                            &&
                        <div className="alert alert-danger animate__animated animate__fadeIn">
                            There is not a hero with <strong>{q}</strong> 
                        </div>
 
                    }
 
                        {
                            heroesFiltered.map(hero => (
                                <HeroCard 
                                    key={hero.id}
                                    {...hero} 
                                />
                            ))
                        } 

                </div>
            </div>
        </div>
    )
}
