import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { TodoStatus } from "../../interfaces/TodoStatus";
import { useAppContext } from "../../providers/AppProvider";
import { statusColor } from "../../utils/statusColor";
import { RemoveIcon } from "../Icons";

interface DropdownProps {
  selected: TodoStatus;
  id: number;
}

const TodoItemOptions: React.FC<DropdownProps> = ({ selected, id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { deleteTodo, updateTodoStatus } = useAppContext();
  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, () => setOpen(false));

  const Options = Object.keys(TodoStatus).map((status, i) => {
    const color = statusColor[status as keyof typeof statusColor];
    if (status === selected) return;
    return (
      <li key={status}>
        <button
          className={`py-1 px-2 w-full whitespace-nowrap bg-transparent text-slate-900 hover:bg-slate-200 hover:text-${color}-600 hover:cursor-pointer disabled:text-gray-500 capitalize rounded-md transition-all`}
          onClick={() => [
            updateTodoStatus(id, status as TodoStatus),
            setOpen(false),
          ]}
        >
          {status.replace("_", " ")}
        </button>
      </li>
    );
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`px-1 rounded-[4px] text-sm bg-${statusColor[selected]}-400 text-slate-900 font-bold hover:filter hover:brightness-125 transition-all`}
        onClick={() => setOpen(!open)}
      >
        {selected.replace("_", " ")}
      </button>
      <ul
        className={clsx(
          "min-w-max absolute right-0 bg-slate-100 z-50 float list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none",
          !open && "hidden"
        )}
      >
        {Options}
        <li>
          <button
            className={`py-1 px-2 w-full whitespace-nowrap bg-transparent text-slate-100 bg-slate-700 hover:bg-red-700 flex gap-2 items-center justify-center rounded-b-md transition-all`}
            onClick={() => [deleteTodo(id), setOpen(false)]}
          >
            <RemoveIcon /> Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TodoItemOptions;
