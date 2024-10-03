import React, { useState, useEffect } from "react";
import { Input, DatePicker, Radio, Button, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Update = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState(null);
  const [status, setStatus] = useState("in-progress");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://66f4107877b5e889709822a6.mockapi.io/crud/${id}`)
      .then((response) => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDuedate(dayjs(task.duedate));
        setStatus(task.status);
      })
      .catch(() => {
        message.error("Something went wrong while fetching the task data.");
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!title || !description || !duedate) {
      setError("All fields are required!");
      return;
    }

    axios
      .put(`https://66f4107877b5e889709822a6.mockapi.io/crud/${id}`, {
        title,
        description,
        duedate: dayjs(duedate).format("YYYY-MM-DD"),
        status,
      })
      .then(() => {
        message.success("Task updated successfully!");
        setTimeout(() => navigate("/read"), 2000);
      })
      .catch(() => {
        message.error("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-2 mb-10 font-sans sm:px-4 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">UPDATE TASK</h2>
        <Link to="/read">
          <Button className="w-24 font-bold" type="primary">
            SHOW TASK
          </Button>
        </Link>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label className="block text-slate-700 mb-1">Title</label>
          <Input
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="placeholder-slate-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <Input.TextArea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="placeholder-slate-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Due Date</label>
          <DatePicker
            className="w-full sm:w-full lg:w-full placeholder-slate-400"
            value={duedate}
            onChange={(date) => setDuedate(date)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Status</label>
          <Radio.Group
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex sm:flex-col lg:flex-row space-x-2"
          >
            <Radio className="font-sans" value="in-progress">
              In Progress
            </Radio>
            <Radio className="font-sans" value="completed">
              Completed
            </Radio>
          </Radio.Group>
        </div>

        <div className="flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full sm:w-full lg:w-24 font-bold"
          >
            UPDATE TASK
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Update;
