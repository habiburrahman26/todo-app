import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const AddTask = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const task = {
      taskName: data.taskName,
      description: data.description,
      email: user?.email,
    };
    axios.post('http://localhost:5000/task', task).then(({ data: result }) => {
      if (result.insertedId) {
        toast.success('Task added successfully');
        reset();
        navigate('/myTask');
      }
    });
  };

  return (
    <div className="shadow-md max-w-md p-8 mx-auto mt-20">
      <h2 className="text-3xl text-center mb-8">Add Task</h2>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Task Name..."
          {...register('taskName', { required: true })}
          className="input input-bordered w-full max-w-xs"
        />
        {errors.taskName && (
          <small className="text-red-400  self-start ml-8">
            Task name is Require
          </small>
        )}
        <textarea
          className="textarea textarea-bordered w-full max-w-xs"
          placeholder="Description..."
          {...register('description', { required: true })}
          rows="4"
        ></textarea>
        {errors.description && (
          <small className="text-red-400 self-start ml-8">
            Description is Require
          </small>
        )}
        <button type="submit" className="btn btn-accent">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
