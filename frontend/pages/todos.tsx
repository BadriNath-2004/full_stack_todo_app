import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Todo = {
  _id: string;
  task: string;
  dueDate: string;
  completed: boolean;
};

export default function TodosPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    if (!user || !token) router.push("/login");
  }, [user, token]);

  useEffect(() => {
    if (!token) return;

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || t("error.fetch"));

        setTodos(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !dueDate.trim()) return;

    try {
      const res = await fetch("http://localhost:4000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task,
          dueDate: new Date(dueDate).toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("error.add"));

      setTodos((prev) => [data, ...prev]);
      setTask("");
      setDueDate("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/todos/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("error.toggle"));

      setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("error.delete"));

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo._id);
    setEditTask(todo.task);
    setEditDueDate(todo.dueDate.slice(0, 16));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTask("");
    setEditDueDate("");
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: editTask,
          dueDate: new Date(editDueDate).toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("error.update"));

      setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
      cancelEditing();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{t("yourTodos")}</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form
          onSubmit={handleAdd}
          className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
        >
          <div className="flex flex-col gap-2">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder={t("placeholder.task") || ""}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            <PlusIcon className="w-5 h-5" />
            {t("add")}
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500">{t("loading")}</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                {editingId === todo._id ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                    <input
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <input
                      type="datetime-local"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleUpdate(todo._id)}
                        className="text-green-600 hover:underline"
                      >
                        {t("save")}
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-600 hover:underline"
                      >
                        {t("cancel")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`cursor-pointer transition ${
                      todo.completed ? "opacity-50 line-through" : ""
                    }`}
                    onClick={() => toggleComplete(todo._id)}
                  >
                    <p className="font-medium text-lg">{todo.task}</p>
                    <p className="text-sm text-gray-500">
                      {t("due")}: {new Date(todo.dueDate).toLocaleString()}
                    </p>
                  </div>
                )}

                {editingId !== todo._id && (
                  <div className="flex gap-4 mt-3 sm:mt-0 sm:ml-4">
                    <button onClick={() => startEditing(todo)} title={t("edit")}>
                      <PencilSquareIcon className="w-5 h-5 text-blue-600 hover:text-blue-800 transition" />
                    </button>
                    <button onClick={() => deleteTodo(todo._id)} title={t("delete")}>
                      <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 transition" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
