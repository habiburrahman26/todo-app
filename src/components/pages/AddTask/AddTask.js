import React from 'react';

const AddTask = () => {
  return (
    <div className="shadow-lg max-w-md p-8 mx-auto mt-20">
      <h2 className="text-3xl text-center mb-8">Add Task</h2>
      <form className="flex flex-col items-center gap-3">
        <input
          type="text"
          placeholder="Task..."
          class="input input-bordered w-full max-w-xs"
        />
        <textarea
          class="textarea textarea-bordered w-full max-w-xs"
          placeholder="Description..."
          rows="4"
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
