// ===== SAVE CLIENT =====
function saveClient() {
  const cid = document.getElementById("cid").value;
  const deposit = document.getElementById("deposit").value;

  if (!cid || !deposit) {
    alert("CID aur Deposit likho");
    return;
  }

  localStorage.setItem(cid, deposit);
  alert("Client saved");
}

// ===== LOAD CLIENT =====
function loadClient() {
  const cid = document.getElementById("cid").value;
  const result = document.getElementById("result");

  const data = localStorage.getItem(cid);

  if (!data) {
    result.innerHTML = "Client not found";
    return;
  }

  result.innerHTML = "Deposit: " + data;
}
