import { useState } from 'react';

export default function Deposit() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bal, setBal] = useState(0);
    const [dep, setDep] = useState();
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch("https://bank-server-1-c34h.onrender.com/login", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, password })
            });
            const data = await response.json();
            if (data.success) {
                setAuthenticated(true);
                setBal(data.amount);
                setUserId(data.userId);
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    async function handleDeposit(e) {
        e.preventDefault();
        
        if (!userId) {
            alert("User not authenticated. Please log in again.");
            return;
        }

        if (dep <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
        }

        try {
            const response = await fetch("https://bank-server-1-c34h.onrender.com/deposit", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, deposit: dep })  
            });
            const data = await response.json();
            if (data.success) {
                setBal(data.newBalance);
                alert("Deposit successful!");
            } else {
                alert(data.message || "Error depositing");
            }
        } catch (error) {
            console.error("Deposit error:", error);
        }
    }

    return (
        <div className="deposit-container">
            <h1>Deposit Money 💸</h1>
            <p>Your's funds has been protected safely with your Black's bank.</p>
            
            {!authenticated ? (
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleDeposit}>
                        <input type="number" placeholder="Enter amount" value={dep} onChange={(e) => setDep(Number(e.target.value))} required />
                        <button type="submit">Deposit</button>
                    </form>
                    <h2>Balance: {bal}</h2>
                </>
            )}
        </div>
    );
}
