import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')({
    position: 'relative',
    marginTop: '1.5rem',
    paddingLeft: '100px',
    paddingRight: '20px',
    overflow: 'hidden',

    '@media (max-width: 1024px)': {
        paddingLeft: '90px',
    },
    '@media (max-width: 768px)': {
        paddingLeft: '60px',
        paddingRight: '1rem',
    },
    '@media (max-width: 480px)': {
        paddingLeft: '10px',
        paddingRight: '0.5rem',
    },
});

export const Title = styled('h2')({
    color: 'white',
    marginBottom: '0.8rem',
    fontSize: '1.5rem',

    '@media (max-width: 768px)': {
        fontSize: '1.3rem',
    },
    '@media (max-width: 480px)': {
        fontSize: '1.1rem',
    },
});

export const ScrollContainer = styled('div')({
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    scrollBehavior: 'smooth',
    gap: '1rem',
    padding: '0.5rem 0',
    height: 'auto',
});

export const LeftScrollButton = styled('button')({
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    border: 'none',
    padding: '0.4rem',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
        transform: 'translateY(-50%) scale(1.1)',
    },
    '@media (max-width: 480px)': {
        display: 'none',
    },
});

export const RightScrollButton = styled('button')({
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    border: 'none',
    padding: '0.4rem',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
        transform: 'translateY(-50%) scale(1.1)',
    },
    '@media (max-width: 480px)': {
        display: 'none',
    },
});
