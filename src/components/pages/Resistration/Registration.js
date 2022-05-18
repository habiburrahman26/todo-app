import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import useToken from '../../../hooks/useToken';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const [token] = useToken(user || gUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/appoinemnt', { replace: true });
    }
  }, [token, navigate]);

  if (loading || gLoading || updating) {
    return <LoadingSpinner />;
  }

  let signInError;
  if (error || gError) {
    signInError = (
      <p className="text-red-500">{error?.message || gError?.message}</p>
    );
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  return (
    <div className="shadow-lg max-w-md p-8 mx-auto mt-12">
      <h1 className="text-3xl text-center mb-6">Registration</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-bordered w-full max-w-sm"
            type="text"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is Required',
              },
            })}
          />
          <label className="label -mb-4">
            {errors.name?.type === 'required' && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered w-full max-w-sm"
            type="email"
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
          Submit
        </button>
      </form>
      <p className="text-center mt-4 mb-4">
        Already have an account?{' '}
        <Link to="/login" className="text-secondary">
          Login here
        </Link>
      </p>
      <div className="divider">OR</div>
      <div className="text-center mt-8">
        <button
          className="btn btn-outline uppercase"
          onClick={() => signInWithGoogle()}
        >
          continue with google
        </button>
      </div>
    </div>
  );
};

export default Registration;
