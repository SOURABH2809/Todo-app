import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Select, Checkbox } from "antd";
import dayjs from "dayjs";

const Read = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [filterStatus, setFilterStatus] = useState("all");

  const getData = () => {
    fetch("https://66f4107877b5e889709822a6.mockapi.io/crud")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://66f4107877b5e889709822a6.mockapi.io/crud/${id}`, {
      method: "DELETE",
    }).then(() => {
      getData();
    });
  };

  const toggleTaskStatus = (id, currentStatus) => {
    const updatedStatus =
      currentStatus === "completed" ? "inprogress" : "completed";

    fetch(`https://66f4107877b5e889709822a6.mockapi.io/crud/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedStatus }),
    }).then(() => {
      getData();
    });
  };

  const setToLocalStorage = (
    id,
    title,
    description,
    priority,
    status,
    duedate
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("priority", priority);
    localStorage.setItem("status", status);
    localStorage.setItem("duedate", duedate);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);

    if (status === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (task) => task.status.toLowerCase() === status.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "#",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      className: "text-center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "text-justify",
      render: (text, record) => (
        <span className={record.status === "completed" ? "line-through" : ""}>
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "text-justify",
      render: (text, record) => (
        <span className={record.status === "completed" ? "line-through" : ""}>
          {text}
        </span>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
      className: "text-justify",
      render: (duedate) => <span>{dayjs(duedate).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "text-justify",
      render: (status, record) => (
        <Checkbox
          checked={status === "completed"}
          onChange={() => toggleTaskStatus(record.id, record.status)}
        >
          <span
            className={`text-white py-1 px-2 rounded ${
              status === "completed" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status === "completed" ? "Completed" : "In Progress"}
          </span>
        </Checkbox>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      className: "text-justify",
      render: (record) => (
        <span>
          <Link to="/update">
            <Button
              onClick={() =>
                setToLocalStorage(
                  record.id,
                  record.title,
                  record.description,
                  record.priority,
                  record.status,
                  record.duedate
                )
              }
              className="mr-2 bg-sky-500 text-white hover:bg-sky-600 transition duration-300"
            >
              Edit
            </Button>
          </Link>
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            className="ml-2 bg-red-500 text-red hover:bg-red-600 transition duration-300"
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center mb-4 space-x-4 flex-wrap sm:flex-nowrap">
        <Select
          defaultValue="all"
          onChange={handleFilterChange}
          className="w-full sm:w-1/6 font-serif"
        >
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="inprogress">In Progress</Select.Option>
        </Select>

        <Link to="/create">
          <Button className="bg-gray-600 text-white hover:bg-gray-700 transition duration-300 font-bold w-full sm:w-auto">
            CREATE TASK
          </Button>
        </Link>
      </div>

      <div className="mx-4 sm:mx-16 my-4 p-4 bg-white rounded-lg shadow-xl font-serif">
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
            pageSizeOptions: ["5"],
          }}
          onChange={handleTableChange}
          className="font-serif w-full"
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
};

export default Read;
