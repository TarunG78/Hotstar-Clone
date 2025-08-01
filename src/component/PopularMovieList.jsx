import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import axios from 'axios';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import {
    Wrapper,
    Title,
    ScrollContainer,
    LeftScrollButton,
    RightScrollButton,
} from './PopularMovieList.styles';

import MovieDetailPopup from './MovieDetailPopup';
import Loader from '../component/Loader';
const MovieCard = lazy(() => import('./MovieCard'));

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const API_URL = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

function PopularMovieList() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [visibleCount, setVisibleCount] = useState(7);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    const fetchMovies = async (pageNum) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}&page=${pageNum}`);
            const newMovies = response.data.results || [];

            if (newMovies.length === 0) {
                setHasMore(false);
                return;
            }

            setMovies((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const unique = newMovies.filter((m) => !existingIds.has(m.id));
                return [...prev, ...unique];
            });

            setPage(pageNum);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible && movies.length === 0) {
            fetchMovies(1);
        }
    }, [isVisible, movies.length]);

    const scrollLeft = () => {
        containerRef.current?.scrollBy({ left: -1800, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (isLoading) return;

        containerRef.current?.scrollBy({ left: 1800, behavior: 'smooth' });

        setVisibleCount((prev) => {
            const nextCount = prev + 7;
            if (nextCount > movies.length - 7 && hasMore && !isLoading) {
                fetchMovies(page + 1);
            }
            return nextCount;
        });
    };

    return (
        <div ref={sectionRef}>
            {isVisible && (
                <Wrapper>
                    <Title>Popular Movies</Title>
                    <LeftScrollButton onClick={scrollLeft}>
                        <ArrowBackIos />
                    </LeftScrollButton>
                    <ScrollContainer ref={containerRef}>
                        <Suspense fallback={<Loader />}>
                            {movies.slice(0, visibleCount).map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    imageUrl={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                    title={movie.title}
                                    onClick={() =>
                                        setSelectedMovie({
                                            imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
                                            title: movie.title,
                                            overview: movie.overview,
                                        })
                                    }
                                />
                            ))}

                            {isLoading &&
                                Array.from({ length: 7 }).map((_, i) => (
                                    <Loader key={`loader-${i}`} />
                                ))}
                        </Suspense>
                        {selectedMovie && (
                            <MovieDetailPopup
                                movie={selectedMovie}
                                onClose={() => setSelectedMovie(null)}
                            />
                        )}
                    </ScrollContainer>
                    <RightScrollButton onClick={scrollRight}>
                        <ArrowForwardIos />
                    </RightScrollButton>
                </Wrapper>
            )}
        </div>
    );
}

export default PopularMovieList;