// src/App.jsx
import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router"; 
import { UserContext } from "./contexts/UserContext";
import * as jobService from "./services/jobService"

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
	const { user } = useContext(UserContext);
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const fetchAllJobs = async () => {
			const jobsData = await jobService.index();
			setJobs(jobsData)
		}
		if (user) fetchAllJobs();
	}, [user]);

	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={user ? <Dashboard jobs={jobs} /> : <Landing />} />
				<Route path="/sign-up" element={<SignUpForm />} />
				<Route path="/sign-in" element={<SignInForm />} />
			</Routes>
		</>
	);
};

export default App;
