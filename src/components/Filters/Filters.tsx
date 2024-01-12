import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { MovieSelect } from './components/MovieSelect';
import { GenderRadio } from './components/GenderRadio';
import { MassInput } from './components/MassInput';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { getMovies } from '../../store/movies/moviesSlice';

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error, loaded } = useAppSelector(
    (state) => state.moviesSlice
  );
  const { loaded: MoviesLoaded } = useAppSelector(
    (state) => state.charactersSlice
  );

  useEffect(() => {
    if (!loaded) {
      dispatch(getMovies());
    }
  }, [dispatch, loaded]);

  return (
    <>
      <Box
        height={'100%'}
        display={loading ? 'flex' : 'unset'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {!loading && MoviesLoaded && movies && (
          <>
            <Typography
              variant={'h4'}
              fontWeight={500}
            >
              Filters
            </Typography>
            <MovieSelect movies={movies} />
            <GenderRadio />
            <MassInput />
          </>
        )}

        {loading && !MoviesLoaded && (
          <CircularProgress
            size={70}
            style={{ color: '#fff' }}
          />
        )}
      </Box>
    </>
  );
};
