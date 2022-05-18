import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const MyTask = () => {
  const [user, loading] = useAuthState(auth);

  const { data, isLoading } = useQuery(['task-list', user], () =>
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
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyTask;
