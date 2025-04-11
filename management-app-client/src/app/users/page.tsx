"use client";

import Header from "@/components/Header";
import { useGetUsersQuery } from "@/lib/state/api";
import { useAppSelector } from "@/lib/store";
import { dataGridClassNames, dataGridSxStyles, getImageUrl } from "@/lib/utils";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import React from "react";

type Props = {};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            width={100}
            height={50}
            src={getImageUrl(params.value)}
            alt={params.row.username}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const Users = (props: Props) => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const { data: users } = data || {};

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching users</div>;
  return (
    <section className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div className="h-[650px] w-full">
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.id}
          pagination
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </section>
  );
};

export default Users;
