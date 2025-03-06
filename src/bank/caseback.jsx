import { useState } from 'react';

export default function Withdraw() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bal, setBal] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState();
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

   
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/login", {
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

    async function handleWithdraw(e) {
        e.preventDefault();
        
        if (!userId) {
            alert("User not authenticated. Please log in again.");
            return;
        }

        if (withdrawAmount <= 0) {
            alert("Please enter a valid withdrawal amount.");
            return;
        }

        if (withdrawAmount > bal) {
            alert("Insufficient balance!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, amount: withdrawAmount })
            });
            const data = await response.json();
            if (data.success) {
                setBal(data.newBalance);
                alert("Withdrawal successful!");
            } else {
                alert(data.message || "Error withdrawing");
            }
        } catch (error) {
            console.error("Withdraw error:", error);
        }
    }

    return (
        <div className="withdraw-container">
            <h1>Withdraw Money 💸</h1>
           
            
            {!authenticated ? (
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleWithdraw}>
                        <input type="number" placeholder="Enter amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} required /><br></br>
                        <button type="submit">Withdraw</button>
                        <h2>Balance: {bal}</h2>
                    </form>
                   
                </>
            )}
        </div>
    );
}
