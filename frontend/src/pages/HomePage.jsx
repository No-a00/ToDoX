// component
import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatusAndFilters from "@/components/StatusAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/db";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);

  const [filter, setFilter] = useState("all");

  const [dateQuery, setDateQuery] = useState("today");

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("lỗi xảy ra khi truy xuất task", error);
      toast.error("lỗi xảy ra khi truy xuất task");
    }
  };
  //biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleTaskChanged = () => {
    fetchTasks();
  };

  //chia page

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };
  const handlePagechange = (newPage) => {
    setPage(newPage);
  };
  if (visibleTasks.length === 0) {
    handlePrev();
  }

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Warm Orange Glow Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(255, 140, 60, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10 ">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* đẩuf trang  */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          {/* danh sách nhiệm vụ  */}
          <StatusAndFilters
            completedTaskCount={completeTaskCount}
            activeTaskCount={activeTaskCount}
            filter={filter}
            setFilter={setFilter}
          />

          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          {/* phần chân trang và lọc theo date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row ">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePagechange={handlePagechange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          {/* CHÂN TRANG */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
