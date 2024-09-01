import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Box,
  Heading,
  VStack,
  Select,
  Text,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const App = () => {
  const [page, setPage] = useState("login"); // Tracks the current page
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carbonCredits, setCarbonCredits] = useState(0);
  const [project, setProject] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [money, setMoney] = useState(1000); // Initial money balance
  const [carbonAmount, setCarbonAmount] = useState(0); // Amount of carbon credits to buy/sell
  const [selectedProject, setSelectedProject] = useState("");
  const [buyCost, setBuyCost] = useState(0);
  const [sellEarnings, setSellEarnings] = useState(0);

  const conversionRates = {
    "project-1": { rate: 0.28, cost: 150 },
    "project-2": { rate: 0.5, cost: 100 },
    "project-3": { rate: 0.06, cost: 180 },
  };

  useEffect(() => {
    if (selectedProject) {
      const { rate, cost } = conversionRates[selectedProject];
      const totalCost = (carbonAmount / rate) * cost;
      setBuyCost(totalCost.toFixed(2));
      setSellEarnings(totalCost.toFixed(2));
    }
  }, [carbonAmount, selectedProject]);

  const handleRegistration = () => {
    console.log("User Registered:", { username, email, password });
    setPage("dashboard");
  };

  const handleLogin = () => {
    console.log("User Logged in:", { email, password });
    setPage("dashboard");
  };

  const handleBuyCarbonCredits = () => {
    if (!selectedProject) {
      alert("Please select a project before making a transaction.");
      return;
    }

    const { rate, cost } = conversionRates[selectedProject];
    const totalCost = (carbonAmount / rate) * cost;

    if (totalCost > money) {
      alert("Insufficient funds to buy carbon credits.");
      return;
    }

    setMoney((prevMoney) => prevMoney - totalCost);
    setCarbonCredits((prevCredits) => prevCredits + carbonAmount);
    setTransactionHistory((prevHistory) => [
      ...prevHistory,
      `Bought ${carbonAmount.toFixed(
        2
      )} credits from ${selectedProject} for $${totalCost.toFixed(2)}`,
    ]);
  };

  const handleSellCarbonCredits = () => {
    if (!selectedProject) {
      alert("Please select a project before making a transaction.");
      return;
    }

    const { rate, cost } = conversionRates[selectedProject];
    const totalEarnings = (carbonAmount / rate) * cost;

    if (carbonAmount > carbonCredits) {
      alert("You don't have enough carbon credits to sell.");
      return;
    }

    setMoney((prevMoney) => prevMoney + totalEarnings);
    setCarbonCredits((prevCredits) => prevCredits - carbonAmount);
    setTransactionHistory((prevHistory) => [
      ...prevHistory,
      `Sold ${carbonAmount.toFixed(
        2
      )} credits from ${selectedProject} for $${totalEarnings.toFixed(2)}`,
    ]);
  };

  const handleCalculateCarbonFootprint = () => {
    const travelEmissions = 100;
    const energyEmissions = 200;
    const consumptionEmissions = 150;
    const totalEmissions =
      travelEmissions + energyEmissions + consumptionEmissions;
    setCarbonFootprint(totalEmissions);
    console.log("Carbon Footprint Calculated:", totalEmissions);
  };

  return (
    <Box maxW="3xl" mx="auto" p={4}>
      {page === "login" && (
        <LoginPage
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onLogin={handleLogin}
          onNavigate={() => setPage("signup")}
        />
      )}
      {page === "signup" && (
        <SignupPage
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onRegister={handleRegistration}
          onNavigate={() => setPage("login")}
        />
      )}
      {page === "dashboard" && (
        <Dashboard
          money={money}
          carbonCredits={carbonCredits}
          transactionHistory={transactionHistory}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setCarbonAmount={setCarbonAmount}
          carbonAmount={carbonAmount}
          handleBuyCarbonCredits={handleBuyCarbonCredits}
          handleSellCarbonCredits={handleSellCarbonCredits}
          handleCalculateCarbonFootprint={handleCalculateCarbonFootprint}
          carbonFootprint={carbonFootprint}
          buyCost={buyCost}
          sellEarnings={sellEarnings}
          setPage={setPage}
        />
      )}
      {page === "wallet" && (
        <WalletPage money={money} setMoney={setMoney} setPage={setPage} />
      )}
      {page === "profile" && (
        <ProfilePage
          username={username}
          email={email}
          money={money}
          transactionHistory={transactionHistory}
          setPage={setPage}
        />
      )}
    </Box>
  );
};

// Login Page Component
const LoginPage = ({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onNavigate,
}) => (
  <Box borderWidth="1px" borderRadius="lg" p={4}>
    <Heading size="md" mb={4}>
      Login
    </Heading>
    <Text mb={2}>Email</Text>
    <Input
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      mb={2}
    />
    <Text mb={2}>Password</Text>
    <Input
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      mb={4}
    />
    <Button colorScheme="teal" onClick={onLogin}>
      Login
    </Button>
    <Button variant="link" mt={2} onClick={onNavigate}>
      Sign up instead
    </Button>
  </Box>
);

// Signup Page Component
const SignupPage = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  onRegister,
  onNavigate,
}) => (
  <Box borderWidth="1px" borderRadius="lg" p={4}>
    <Heading size="md" mb={4}>
      Sign Up
    </Heading>
    <Text mb={2}>Username</Text>
    <Input
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      mb={2}
    />
    <Text mb={2}>Email</Text>
    <Input
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      mb={2}
    />
    <Text mb={2}>Password</Text>
    <Input
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      mb={4}
    />
    <Button colorScheme="teal" onClick={onRegister}>
      Register
    </Button>
    <Button variant="link" mt={2} onClick={onNavigate}>
      Login instead
    </Button>
  </Box>
);

// Dashboard Component
const Dashboard = ({
  money,
  carbonCredits,
  transactionHistory,
  selectedProject,
  setSelectedProject,
  setCarbonAmount,
  carbonAmount,
  handleBuyCarbonCredits,
  handleSellCarbonCredits,
  handleCalculateCarbonFootprint,
  carbonFootprint,
  buyCost,
  sellEarnings,
  setPage,
}) => (
  <Box maxW="3xl" mx="auto" p={4}>
    <Heading size="lg" mb={6} textAlign="center">
      Welcome to Carbon Exchange Dashboard
    </Heading>
    <Button onClick={() => setPage("wallet")} mb={4}>
      Go to Wallet
    </Button>
    <Button onClick={() => setPage("profile")} mb={4}>
      Go to Profile
    </Button>
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md" mb={4}>
        Project Listing
      </Heading>
      <Select
        placeholder="Select a project"
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="project-1">Project 1 (Rate: $150 = 0.28 Credits)</option>
        <option value="project-2">Project 2 (Rate: $100 = 0.5 Credits)</option>
        <option value="project-3">Project 3 (Rate: $180 = 0.06 Credits)</option>
      </Select>
      <NumberInput
        min={0}
        value={carbonAmount}
        onChange={(valueString) =>
          setCarbonAmount(parseFloat(valueString) || 0)
        }
        mt={4}
      >
        <NumberInputField placeholder="Carbon Credits Amount" />
      </NumberInput>
      <Text mt={2}>Cost to Buy: ${buyCost}</Text>
      <Text mt={2}>Earnings if Sold: ${sellEarnings}</Text>
      <Button colorScheme="blue" onClick={handleBuyCarbonCredits} mr={2}>
        Buy Carbon Credits
      </Button>
      <Button colorScheme="red" onClick={handleSellCarbonCredits}>
        Sell Carbon Credits
      </Button>
    </Box>
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md" mb={4}>
        Transaction History
      </Heading>
      <List spacing={3}>
        {transactionHistory.map((transaction, index) => (
          <ListItem key={index}>{transaction}</ListItem>
        ))}
      </List>
    </Box>
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md" mb={4}>
        Carbon Footprint Calculator
      </Heading>
      <Text mb={2}>Carbon Footprint: {carbonFootprint} kg CO2</Text>
      <Button colorScheme="green" onClick={handleCalculateCarbonFootprint}>
        Calculate Carbon Footprint
      </Button>
    </Box>
  </Box>
);

// Wallet Page Component
const WalletPage = ({ money, setMoney, setPage }) => {
  const [amount, setAmount] = useState(0);

  const handleAddMoney = () => {
    setMoney((prevMoney) => prevMoney + amount);
    alert(`Added $${amount}`);
  };

  const handleReduceMoney = () => {
    if (amount > money) {
      alert("Insufficient funds.");
      return;
    }
    setMoney((prevMoney) => prevMoney - amount);
    alert(`Reduced $${amount}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Button onClick={() => setPage("dashboard")} mb={4}>
        Back to Dashboard
      </Button>
      <Heading size="md" mb={4}>
        Wallet
      </Heading>
      <Text mb={2}>Current Balance: ${money.toFixed(2)}</Text>
      <NumberInput
        defaultValue={0}
        min={0}
        value={amount}
        onChange={(valueString) => setAmount(parseFloat(valueString) || 0)}
        mb={2}
      >
        <NumberInputField placeholder="Amount" />
      </NumberInput>
      <Button colorScheme="teal" onClick={handleAddMoney} mr={2}>
        Add Money
      </Button>
      <Button colorScheme="orange" onClick={handleReduceMoney}>
        Reduce Money
      </Button>
    </Box>
  );
};

// Profile Page Component
const ProfilePage = ({
  username,
  email,
  money,
  transactionHistory,
  setPage,
}) => (
  <Box borderWidth="1px" borderRadius="lg" p={4}>
    <Button onClick={() => setPage("dashboard")} mb={4}>
      Back to Dashboard
    </Button>
    <Heading size="md" mb={4}>
      Profile
    </Heading>
    <Text mb={2}>Username: {username}</Text>
    <Text mb={2}>Email: {email}</Text>
    <Text mb={2}>Current Balance: ${money.toFixed(2)}</Text>
    <Heading size="sm" mt={4} mb={2}>
      Transaction History
    </Heading>
    <List spacing={3}>
      {transactionHistory.map((transaction, index) => (
        <ListItem key={index}>{transaction}</ListItem>
      ))}
    </List>
  </Box>
);

export default App;
