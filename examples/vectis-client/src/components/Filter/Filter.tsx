import React from "react";
import { TodoStatus } from "../../interfaces/TodoStatus";
import clsx from "clsx";
import { statusColor } from "../../utils/statusColor";

interface Props {
  selectedFilter: TodoStatus | "";
  setFilter: (filter: TodoStatus | "") => void;
}

const Filter: React.FC<Props> = ({ selectedFilter, setFilter }) => {
  return (
    <div className="flex items-center justify-center gap-6 py-4 px-8 text-sm md:text-lg lg:text-2xl font-bold flex-wrap">
      <button
        className={clsx(
          "text-transparent bg-clip-text bg-gradient-to-tr from-slate-100 to-slate-200/70 border-b-2 transition-all hover:filter hover:brightness-125 ",
          selectedFilter === "" ? "border-slate-100" : `border-transparent`
        )}
        onClick={() => setFilter("")}
      >
        All
      </button>
      {Object.keys(TodoStatus).map((status) => {
        const color = statusColor[status as keyof typeof statusColor];
        return (
          <React.Fragment key={`status-${status}`}>
            <span className="w-[1px] h-4 bg-transparent md:bg-slate-50" />
            <button
              className={clsx(
                `text-transparent bg-clip-text bg-gradient-to-tr from-${color}-400 to-${color}-600/70 capitalize border-b-2 hover:filter hover:brightness-125 transition-all`,
                selectedFilter === status
                  ? `border-${color}-400`
                  : `border-transparent`
              )}
              onClick={() => setFilter(status as TodoStatus)}
            >
              {status.replace("_", " ")}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Filter;
