"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/lib/state/api";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });
  const { data: searchResults } = data || {};
  const searchTaskResults = searchResults?.tasks || [];
  const searchProjectResults = searchResults?.projects || [];
  const searchUserResults = searchResults?.user || [];

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 500);

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <section className="max-w-full p-8">
      <Header name="Search" />
      <div className="mt-2">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while searching</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchTaskResults.length > 0 && <h2>Tasks</h2>}
            {searchTaskResults.length > 0 &&
              searchTaskResults?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}

            {searchProjectResults.length > 0 && <h2>Projects</h2>}
            {searchProjectResults.length > 0 &&
              searchProjectResults?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            {searchUserResults.length > 0 && <h2>Users</h2>}
            {searchUserResults.length > 0 &&
              searchUserResults?.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
