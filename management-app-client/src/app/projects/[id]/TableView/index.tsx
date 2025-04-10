import Header from "@/components/Header";
import { useGetTasksQuery } from "@/lib/state/api";
import { useAppSelector } from "@/lib/store";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  id: string;
  openNewTaskModal: () => void;
};

export const columnTaskTable: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      return (
        <span className="bg-green inline-flex rounded-full border bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          {params.value}
        </span>
      );
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 110,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 110,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.author || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.assignee || "Unknown",
  },
];

const TableView = ({ id, openNewTaskModal }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data, isLoading, error } = useGetTasksQuery({
    projectId: Number(id),
  });
  const { data: tasks } = data || {};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching tasks</div>;

  return (
    <section className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          isSmallText
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={openNewTaskModal}
            >
              Add Task
            </button>
          }
        />
      </div>

      <div className="pt-2">
        <DataGrid
          rows={tasks || []}
          columns={columnTaskTable}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </section>
  );
};

export default TableView;
