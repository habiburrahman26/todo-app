import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const location = useLocation();
  const navigate = useNavigate();

  let from = location?.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  if (loading) {
    return <LoadingSpinner />;
  }

  let signInError;
  if (error) {
    signInError = <p className="text-red-500">{error?.message}</p>;
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="shadow-lg max-w-md p-8 mx-auto mt-20">
      <h1 className="text-3xl text-center mb-6">Login</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered w-full max-w-sm"
            type="email"
            placeholder="Email"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is Required',
              },
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: 'Enter valid email',
              },
            })}
          />
          <label className="label -mb-4">
            {errors.email?.type === 'required' && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-sm"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is Required',
              },
              minLength: {
                value: 6,
                message: 'Password contain at least 6 character',
              },
            })}
          />
          <label className="label">
            {errors.password?.type === 'required' && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>

        {/* sign in error messgae show */}
        {signInError}

        <button className="btn bg-accent text-white mt-4 w-full max-w-sm">
          Login
        </button>
      </form>
      <p className="text-center mt-4 mb-4">
        New to todo-app?{' '}
        <Link to="/signup" className="text-secondary">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default Login;
