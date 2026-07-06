// SAVE CLIENT (ADMIN)
function saveClient() {
  const cid = document.getElementById("cid").value;
  const acc = document.getElementById("acc").value;
  const dep = document.getElementById("dep").value;
  const lots = document.getElementById("lots").value;

  if (!cid) {
    alert("Client ID required");
    return;
  }

  const clientData = {
    account: acc,
    deposit: dep,
    lots: lots
  };

  localStorage.setItem("xylo_" + cid, JSON.stringify(clientData));
  alert("Client saved successfully");
}

// LOAD CLIENT (CLIENT PAGE)
function loadClient() {
  const cid = document.getElementById("cid").value;
  const data = localStorage.getItem("xylo_" + cid);

  if (!data) {
    document.getElementById("result").innerHTML = "❌ Client not found";
    return;
  }

  const c = JSON.parse(data);

  document.getElementById("result").innerHTML = `
    <h3>Account Type: ${c.account}</h3>
    <p>Deposit: $${c.deposit}</p>
    <p>Lots Completed: ${c.lots}</p>
  `;
}
function getTarget(acc, dep) {
  if (acc === "STANDARD") {
    if (dep >= 20000) return { target: 20000, lots: 50, reward: "$1200" };
    if (dep >= 15000) return { target: 15000, lots: 40, reward: "$1000" };
    if (dep >= 10000) return { target: 10000, lots: 25, reward: "$700" };
    if (dep >= 5000) return { target: 5000, lots: 15, reward: "$300" };
    if (dep >= 2000) return { target: 2000, lots: 5, reward: "$100" };
  }

  if (acc === "RAW") {
    if (dep >= 1750) return { target: 1750, lots: 300, reward: "$18 / Lot" };
    if (dep >= 1000) return { target: 1000, lots: 200, reward: "$18 / Lot" };
    if (dep >= 500) return { target: 500, lots: 100, reward: "$18 / Lot" };
  }

  return null;
}
