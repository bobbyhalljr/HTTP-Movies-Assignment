import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
}

const UpdateForm = (props) => {
    const [movie, setMovie] = useState(initialState);

    // descrtucture props
    const { match, savedList, } = props;

    useEffect(() => {
        const id = match.params.id;
        const movieToUpdate = savedList.find(movie => `${movie.id}` === id);
        if(movieToUpdate){
            console.log(movieToUpdate)
            setMovie(movieToUpdate)
        }
    }, [match, savedList])

    const handleChange = e => {
        e.persist();
        let value = e.target.value

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res.data)
            props.setSavedList(res.data)
            props.history.push(`/movies`)
            setMovie(initialState)
        })
        .catch(err => console.log(err))
    }

    return (
    <>
        <h2>Update Movie</h2>

        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                placeholder='Title'
                value={movie.title}
                onChange={handleChange}
            />
            <input
                type='text'
                name='director'
                placeholder='Director'
                value={movie.director}
                onChange={handleChange}
            />
            <input 
                type='text'
                name='metascore'
                placeholder='Meta-Score'
                value={movie.metascore}
                onChange={handleChange}
            />
            <input
                type='text'
                name='stars'
                placeholder='Stars'
                value={movie.stars}
                onChange={handleChange}
            />
            <button>Update Movie</button>
        </form>
    </>
    )
}

export default UpdateForm;