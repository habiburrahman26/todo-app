import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import TaskRow from './TaskRow';

const MyTask = () => {
  const [user, loading] = useAuthState(auth);

  const { data, isLoading,refetch } = useQuery(['task-list', user], () =>
    axios.get(`http://localhost:5000/task/${user.email}`)
  );

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div class="overflow-x-auto">
      <h1 className="text-3xl text-center  mt-20 mb-10">My Tasks List</h1>
      <table class="table mx-auto">
        <thead>
          <tr>
            <th>SL</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((task, i) => (
            <TaskRow key={task._id} sl={i + 1} {...task} refetch={refetch}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTask;
