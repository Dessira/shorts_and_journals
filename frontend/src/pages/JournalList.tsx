import { useEffect } from "react";
import JournalCard from "../components/JournalCard";
import { useJournalStore } from "../store/journalStore";
import { fetchJournals } from "../api/journal";

export default function JournalList() {
  const { journals, setJournals } = useJournalStore();

  useEffect(() => {
    fetchJournals()
      .then(setJournals)
      .catch((err) => console.error(err));
  }, [setJournals]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <p>this is a journal list page</p>
      {journals.map((journal) => (
        <JournalCard
          key={journal.id}
          id={journal.id}
          name={journal.name}
          description={journal.description}
          is_private={journal.is_private}
        />
      ))}
    </div>
  );
}
