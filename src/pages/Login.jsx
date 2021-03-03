import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSymbol from "../components/common/LoadingSymbol";
import { signInUser } from "../reducers/user";

const Login = () => {
	const dispatch = useDispatch();
	const isLogging = useSelector((state) => state.user.isLogging);
	const [email, setEmail] = React.useState("");
	const [pass, setPass] = React.useState("");

	return isLogging ? (
		<div>
			<LoadingSymbol />
		</div>
	) : (
		<div>
			<header>
				<h1>Login</h1>
			</header>
			<form
				className="max-w-lg mx-auto bg-gray-700 rounded-3xl"
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(signInUser(email, pass));
				}}
			>
				<div className="p-20">
					<fieldset className="grid mb-10">
						<input
							type="email"
							required
							placeholder="Email"
							className="py-2 text-xl"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</fieldset>
					<fieldset className="grid mb-10">
						<input
							type="password"
							required
							placeholder="Password"
							className="py-2 text-xl"
							onChange={(e) => setPass(e.target.value)}
							value={pass}
						/>
					</fieldset>
					<div className="flex justify-end">
						<button className="btn-primary">Sign in</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
