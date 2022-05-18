import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const TaskRow = ({ sl, _id, taskName, description, refetch }) => {
  const deleteHandler = () => {
    const confirm = window.confirm(
      `Are you sure you want to delete task ${taskName}?`
    );

    if (confirm) {
      axios.delete(`http://localhost:5000/task/${_id}`).then(({ data }) => {
        if (data.deletedCount > 0) {
          toast.success(`Task ${taskName} deleted successfully`);
        }
        refetch();
      });
    }
  };

  return (
    <tr>
      <th>{sl}</th>
      <td>{taskName}</td>
      <td>{description}</td>
      <td>
        <button class="btn btn-xs btn-error" onClick={deleteHandler}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
