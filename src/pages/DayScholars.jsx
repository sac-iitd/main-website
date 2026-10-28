import { useMemo, useState } from "react";
import students from "../data/dayScholars.json";

const PAGE_SIZE = 50;

const hostels = [];
for (const student of students) {
  if (!hostels.includes(student[2])) hostels.push(student[2]);
}

function DayScholars() {
  const [query, setQuery] = useState("");
  const [hostel, setHostel] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((student) => {
      if (hostel !== "all" && student[2] !== hostel) return false;
      if (!q) return true;
      return (
        student[0].toLowerCase().includes(q) ||
        student[1].toLowerCase().includes(q)
      );
    });
  }, [query, hostel]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const onQuery = (value) => {
    setQuery(value);
    setPage(1);
  };

  const onHostel = (value) => {
    setHostel(value);
    setPage(1);
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-color)]">
        Day Scholars Hostel
      </h1>
      <hr className="mx-auto mt-3 mb-4 w-16 border-t-2 border-[#FFD700]" />
      <p className="text-center max-w-2xl mx-auto text-[var(--text-color)] opacity-90">
        Hostel allotted to each day scholar. Search by name or entry number.
      </p>
      <p className="text-center mt-2 mb-8 text-sm text-[var(--text-color-sub)]">
        {students.length.toLocaleString()} students across {hostels.length} hostels
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search name or entry number"
          aria-label="Search by name or entry number"
          className="flex-1 px-4 py-2.5 rounded-lg border border-[#c4b5a8] bg-white text-[#26282c] placeholder:text-[#5c534e] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
        />
        <select
          value={hostel}
          onChange={(e) => onHostel(e.target.value)}
          aria-label="Filter by hostel"
          className="px-4 py-2.5 rounded-lg border border-[#c4b5a8] bg-white text-[#26282c] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
        >
          <option value="all">All hostels</option>
          {hostels.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-3 text-sm text-[var(--text-color-sub)]">
        {filtered.length === 0
          ? "No student matches that search."
          : `Showing ${start + 1} to ${start + rows.length} of ${filtered.length.toLocaleString()}`}
      </p>

      <div
        className="rounded-xl overflow-hidden shadow-lg border-t-4 border-[#FFD700]"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead>
              <tr className="text-[#FFD700]">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Entry No.</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Year</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Hostel</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((student) => (
                <tr
                  key={student[0]}
                  className="border-t border-white/10 text-[var(--text-color-secondary)]"
                >
                  <td className="px-4 py-2.5 whitespace-nowrap font-medium">
                    {student[0]}
                  </td>
                  <td className="px-4 py-2.5">{student[1]}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">{student[3]}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">{student[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg px-4 py-2 font-semibold bg-[#FFD700] text-[#26282c] disabled:bg-[#d6c6ba] disabled:text-[#26282c] disabled:cursor-not-allowed hover:brightness-110 transition"
          >
            Previous
          </button>
          <span className="text-sm text-[var(--text-color-sub)]">
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="rounded-lg px-4 py-2 font-semibold bg-[#FFD700] text-[#26282c] disabled:bg-[#d6c6ba] disabled:text-[#26282c] disabled:cursor-not-allowed hover:brightness-110 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DayScholars;
