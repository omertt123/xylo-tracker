// ===============================
// SAVE CLIENT
// ===============================
function saveClient() {
  const cid = document.getElementById("cid").value.trim();
  const acc = document.getElementById("acc").value;
  const dep = document.getElementById("dep").value;
  const lots = document.getElementById("lots").value;

  // Validation
  if (!cid || !dep || !lots) {
    alert("Please fill all fields");
    return;
  }

  const clientData = {
    cid: cid,
    account: acc,
    deposit: Number(dep),
    lots: Number(lots),
    target: getTarget(acc, Number(dep)),
    savedAt: new Date().toLocaleString()
  };

  // Save in browser
  localStorage.setItem("xylo_" + cid, JSON.stringify(clientData));

  alert("✅ Client saved successfully");
  console.log("Saved:", clientData);
}

// ===============================
// LOAD CLIENT (client.html)
// ===============================
function loadClient() {
  const cid = document.getElementById("cid").value.trim();
  const result = document.getElementById("result");

  const data = localStorage.getItem("xylo_" + cid);

  if (!data) {
    result.innerHTML = "❌ Client not found";
    return;
  }

  const c = JSON.parse(data);

  result.innerHTML = `
    <h3>Client ID: ${c.cid}</h3>
    <p>Account Type: ${c.account}</p>
    <p>Deposit: $${c.deposit}</p>
    <p>Lots Completed: ${c.lots}</p>
    <p><b>Target:</b> ${c.target}</p>
    <p>Saved At: ${c.savedAt}</p>
    <button onclick="deleteClient('${c.cid}')">❌ Delete Client</button>
  `;
}

// ===============================
// DELETE CLIENT
// ===============================
function deleteClient(cid) {
  localStorage.removeItem("xylo_" + cid);
  alert("🗑 Client deleted");
  document.getElementById("result").innerHTML = "";
}

// ===============================
// TARGET LOGIC
// ===============================
function getTarget(acc, dep) {
  if (acc === "STANDARD") {
    if (dep >= 20000) return "$1200 Reward";
    if (dep >= 15000) return "$1000 Reward";
    if (dep >= 10000) return "$700 Reward";
    if (dep >= 5000) return "$300 Reward";
    if (dep >= 2000) return "$100 Reward";
  }

  if (acc === "RAW") {
    if (dep >= 1750) return "$18 per lot (300 lots)";
    if (dep >= 1000) return "$18 per lot (200 lots)";
    if (dep >= 500) return "$18 per lot (100 lots)";
  }

  return "No target";
}
