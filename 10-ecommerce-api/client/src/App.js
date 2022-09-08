import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  return (
    <>
      <form>
        <h4>Login Form</h4>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container">
          <button type="submit">Submit</button>
          <button type="submit">Logout</button>
        </div>
      </form>
    </>
  );
}

export default App;
