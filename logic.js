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
