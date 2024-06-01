import React from 'react';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ username, password }) => {
    console.log('Form submitted', { username, password });
    login(username, password, () => {
      console.log('Navigating to /');
      navigate('/');
    });
  };

  return (
    <Box p={4} maxWidth="400px" mx="auto" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register('username', { required: true })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password', { required: true })} />
        </FormControl>
        <Button mt={4} type="submit" colorScheme="teal">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
