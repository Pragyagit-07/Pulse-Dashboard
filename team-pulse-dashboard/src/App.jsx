import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "./redux/slices/membersSlice";
import { setCurrentUser } from "./redux/slices/roleSlice";
import Dashboard from "./pages/Dashboard";


export default function App() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);
// Theme state: persisted in localStorage and applied to documentElement
// const [theme, setTheme] = useState(() => {
// try {
// return localStorage.getItem('theme') || 'light';
// } catch { return 'light'; }
// });
  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  useEffect(() => {
    if (members.length > 0) {
      dispatch(setCurrentUser(members[0])); // default user
    }
  }, [members]);
//   useEffect(() => {
// const root = document.documentElement;
// if (theme === 'dark') root.classList.add('dark');
// else root.classList.remove('dark');
// try { localStorage.setItem('theme', theme); } catch {}
// }, [theme]);
// const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return <Dashboard />;
  // return <Dashboard theme={theme} toggleTheme={toggleTheme} />;
}



