async function askQuestion() {
  const question = document.getElementById("questionInput").value;
  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: question }),
  });
  const responseData = await response.json();
  console.log(responseData);

  // Construct HTML for the conversation history entry
  const conversationHistory = document.getElementById("conversationHistory");
  const conversationEntry = document.createElement("div");
  conversationEntry.classList.add("mb-3");
  conversationEntry.innerHTML = `
        <strong class="ms-2">Your question:</strong>
        <p class="ms-2">${question}</p>
        <strong class="ms-2"><i class="fas fa-robot me-1"></i>Bot:</strong>
        <p class="ms-2">${responseData}</p>
    `;

  // check if the conversation history length is greater than 0 so that add hr tag
  if (conversationHistory.children.length > 0) {
    const hrElement = document.createElement("hr");
    hrElement.classList.add("w-100");
    conversationHistory.appendChild(hrElement);
  }

  // Show the conversation history if it's hidden
  conversationHistory.classList.remove("d-none");

  // Append the conversation entry to the conversation history
  conversationHistory.appendChild(conversationEntry);

  // Scroll to the bottom of the conversation history
  conversationHistory.scrollTop = conversationHistory.scrollHeight;

  // Clear the input field
  document.getElementById("questionInput").value = "";
}

// Submit the question when the user presses Enter
document
  .getElementById("questionInput")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      askQuestion();
    }
  });
