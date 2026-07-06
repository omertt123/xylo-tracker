/* =========================
   GLOBAL HELPERS
========================= */

function getClients() {
  return JSON.parse(localStorage.getItem("clients")) || {};
}

function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

/* =========================
   SAVE CLIENT
========================= */

function saveClient() {
  const cid = document.getElementById("cid").value.trim();
  const account = document.getElementById("account").value;
  const deposit = document.getElementById("deposit").value;
  const lots = document.getElementById("lots").value;

  if (!cid || !account || !deposit || !lots) {
    alert("All fields are required");
    return;
  }

  const clients = getClients();

  clients[cid] = {
    cid: cid,
    account: account,
    deposit: Number(deposit),
    lots: Number(lots),
    reward: Number(deposit) * Number(lots),
    createdAt: new Date().toLocaleString()
  };

  saveClients(clients);

  alert("Client Saved Successfully");

  document.getElementById("cid").value = "";
  document.getElementById("account").value = "";
  document.getElementById("deposit").value = "";
  document.getElementById("lots").value = "";
}

/* =========================
   LOAD CLIENT
========================= */

function loadClient() {
  const cid = document.getElementById("cid").value.trim();
  const result = document.getElementById("result");

  if (!cid) {
    alert("Enter Client ID");
    return;
  }

  const clients = getClients();

  if (!clients[cid]) {
    result.innerHTML = "<p style='color:red'>Client not found</p>";
    return;
  }

  const c = clients[cid];

  result.innerHTML = `
    <h3>Client Details</h3>
    <p><b>CID:</b> ${c.cid}</p>
    <p><b>Account:</b> ${c.account}</p>
    <p><b>Deposit:</b> ${c.deposit}</p>
    <p><b>Lots:</b> ${c.lots}</p>
    <p><b>Reward:</b> ${c.reward}</p>
    <p><b>Created:</b> ${c.createdAt}</p>
    <button onclick="deleteClient('${c.cid}')">Delete Client</button>
  `;
}

/* =========================
   DELETE CLIENT
========================= */

function deleteClient(cid) {
  const clients = getClients();

  if (!clients[cid]) {
    alert("Client not found");
    return;
  }

  if (!confirm("Are you sure you want to delete this client?")) {
    return;
  }

  delete clients[cid];
  saveClients(clients);

  document.getElementById("result").innerHTML = "";
  alert("Client Deleted Successfully");
}
