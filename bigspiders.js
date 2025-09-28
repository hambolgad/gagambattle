  let currentPlayer = 1;
  let tempChoice = null;
  let locked1 = false;
  let locked2 = false;

  let posP1 = 20; // starting %
  let posP2 = 80; // starting %
  const step = 2; // step size

  function chooseSpider(name, image) {
    tempChoice = { name, image };

    if (currentPlayer === 1 && !locked1) {
      document.getElementById("player1Name").textContent = name;
      document.getElementById("player1Image").src = image;
    } else if (currentPlayer === 2 && !locked2) {
      document.getElementById("player2Name").textContent = name;
      document.getElementById("player2Image").src = image;
    }
  }

  function lockChoice() {
    if (!tempChoice) return;

    if (currentPlayer === 1 && !locked1) {
      locked1 = true;
      currentPlayer = 2;
      tempChoice = null;
    } else if (currentPlayer === 2 && !locked2) {
      locked2 = true;
      tempChoice = null;
      startBattle();
    }
  }

  function startBattle() {
    document.querySelector(".content-box").style.display = "none";
    document.getElementById("selectBtn").style.display = "none";

    const frame = document.querySelector(".frame");
    const battleArea = document.createElement("div");
    battleArea.classList.add("battle-area");
    battleArea.innerHTML = `
      <h1 style="text-align:center; color:yellow; text-shadow:0 0 10px red;">BATTLE START!</h1>
      <p style="text-align:center; color:#fff;">Controls: Player 1 = W | Player 2 = ↑</p>
      <div id="arena" style="width:100%; height:150px; background:#333; border:4px solid #fff; position:relative; overflow:hidden;">
        <img id="battleP1" src="${document.getElementById("player1Image").src}" 
          style="height:100px; position:absolute; bottom:0; left:${posP1}%;" />
        <img id="battleP2" src="${document.getElementById("player2Image").src}" 
          style="height:100px; position:absolute; bottom:0; left:${posP2}%; transform:scaleX(-1);" />
      </div>
      <h2 id="battleResult" style="text-align:center; color:white;"></h2>
    `;
    frame.appendChild(battleArea);
  }

  function moveSpider(player) {
    const p1 = document.getElementById("battleP1");
    const p2 = document.getElementById("battleP2");
    const result = document.getElementById("battleResult");

    if (!p1 || !p2 || result.textContent !== "") return;

    // Check overlap distance
    const minGap = 10; // % minimum distance between spiders
    if (player === 1) {
      if (posP1 + minGap < posP2) {
        // Move player 1 until it touches player 2
        posP1 += step;
      } else {
        // Push player 2
        posP2 += step;
      }
    } else if (player === 2) {
      if (posP2 - minGap > posP1) {
        // Move player 2 until it touches player 1
        posP2 -= step;
      } else {
        // Push player 1
        posP1 -= step;
      }
    }

    // Update positions
    p1.style.left = posP1 + "%";
    p2.style.left = posP2 + "%";

    // Check win condition
    if (posP1 <= 0) endBattle("PLAYER 2 WINS!", "cyan");
    if (posP2 >= 90) endBattle("PLAYER 1 WINS!", "lime");
  }

  function endBattle(msg, color) {
    const result = document.getElementById("battleResult");
    result.textContent = msg;
    result.style.color = color;
  }

  document.addEventListener("keydown", (event) => {
    if (locked1 && locked2) {
      if (event.key === "w" || event.key === "W") moveSpider(1);
      if (event.key === "ArrowUp") moveSpider(2);
    }
  });
