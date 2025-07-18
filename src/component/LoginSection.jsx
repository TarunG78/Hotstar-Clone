import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    InputAdornment,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import {
    StyledBox,
    StyledCloseIcon,
    StyledTitle,
    StyledSubtitle,
    StyledTextField,
    StyledSubmitButton,
    StyledSwitchText,
    StyledVisibilityIcon,
} from './LoginSection.styles';

function LoginSection({ handleClose, switchToSignUp }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const [userData, setUserData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let emailError = '';
        let passwordError = '';

        if (!userData.email) {
            emailError = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            emailError = 'Invalid email format';
        }

        if (!userData.password) {
            passwordError = 'Password is required';
        } else if (userData.password.length < 6) {
            passwordError = 'Password must be at least 6 characters';
        }

        setErrors({ email: emailError, password: passwordError });

        return !emailError && !passwordError;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const storedUser = JSON.parse(localStorage.getItem('userData'));

        if (
            storedUser &&
            storedUser.email === userData.email &&
            storedUser.password === userData.password
        ) {
            sessionStorage.setItem('loggedIn', true);
            handleClose();
            navigate('/');
            window.location.reload();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <>
            <StyledCloseIcon onClick={handleClose}>
                <CloseIcon sx={{ fontSize: '2.5rem' }} />
            </StyledCloseIcon>

            <StyledTitle variant="h5">Login to continue</StyledTitle>
            <StyledSubtitle variant="body1">Enter your credentials to log in</StyledSubtitle>

            <StyledBox>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" spacing={2}>
                        <StyledTextField
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            value={userData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />

                        <StyledTextField
                            name="password"
                            label="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={userData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <StyledVisibilityIcon
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </StyledVisibilityIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <StyledSubmitButton type="submit" variant="contained">
                            Log In
                        </StyledSubmitButton>
                    </Stack>
                </form>

                <StyledSwitchText variant="body2">
                    Don't have an account?
                    <span onClick={switchToSignUp}> Sign up</span>
                </StyledSwitchText>
            </StyledBox>
        </>
    );
}

export default LoginSection;
