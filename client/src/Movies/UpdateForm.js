import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'


const UpdateForm = (props) => {
    const initialState = {
        id: `${props.match.params.id}`,
        title: '',
        director: '',
        metascore: '',
        stars: '',
    }

    const [movie, setMovie] = useState(initialState);

    // descrtucture props
    const { match, savedList } = props;
    console.log(movie)

    useEffect(() => {
        const id = match.params.id;
        const movieToUpdate = movie.id === id
        if(movieToUpdate){
            console.log(movieToUpdate)
            setMovie(movieToUpdate)
        }
    }, [match, savedList, movie.id])

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

        axios.put(`http://localhost:5000/api/movies/${match.params.id}`, movie)
        .then(res => {
            console.log(res.data)
            props.SavedList(res.data)
            props.history.push(`/item-list/${props.match.params.id}`)
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

export default withRouter(UpdateForm);