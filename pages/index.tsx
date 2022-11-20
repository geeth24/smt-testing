import React, { useEffect, useState } from "react";
import Results from "../components/Results";
import Hero from "../components/Hero";
import { people } from "../components/Select";
import { db } from "../Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { animateScroll as scroll } from "react-scroll";

export default function Home() {
  const [selected, setSelected] = useState(people[1]);
  const [testingSeason, setTestingSeason] = useState("");

  const [results, setResults] = useState([] as any);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const getResults = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const resultsRef = collection(db, testingSeason);

      const q = query(
        resultsRef,
        where("grades", "array-contains", selected.id)
      );

      setResults((await getDocs(q)).docs.map((doc) => doc.data()));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
    //scroll to results id
    scroll.scrollTo(800);
  };

  const getSeason = async () => {
    const seasonRef = doc(db, "testingSeason", "current");
    const seasonSnapshot = await getDoc(seasonRef);
    const seasonData = seasonSnapshot.data();
    setTestingSeason(seasonData?.currentSeason);
  };

  useEffect(() => {
    getSeason();
  }, []);

  console.log(results);
  console.log(selected.id);

  return (
    <>
      <div className="bg-slate-900 font-Inter">
        <Hero
          selected={selected}
          setSelected={setSelected}
          getResults={getResults}
        />

        {loading ? <></> : <Results testingSlots={results} />}
      </div>
    </>
  );
}
