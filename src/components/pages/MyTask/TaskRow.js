import React from 'react';

const TaskRow = ({ sl, _id, taskName, description }) => {
  return (
    <tr>
      <th>{sl}</th>
      <td>{taskName}</td>
      <td>{description}</td>
      <td>
        <button class="btn btn-xs btn-error">delete</button>
      </td>
    </tr>
  );
};

export default TaskRow;
