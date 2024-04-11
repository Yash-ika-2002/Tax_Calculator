// Show modal function
function showModal() {
  document.getElementById("modal").style.display = "block";
}

// Close modal function
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Validate inputs and display modal
document.getElementById("submitBtn").addEventListener("click", function() {
  validateInputs();
});

function validateInputs() {
  // Clear previous error indications and tooltips
  document.querySelectorAll(".errorIcon").forEach(icon => {
    icon.style.display = "none";
    icon.setAttribute("title", ""); // Clear the title attribute
  });

  // Get form values
  const age = document.getElementById("age").value;
  const income = document.getElementById("income").value.trim();
  const extraIncome = document.getElementById("extraIncome").value.trim();
  const deductions = document.getElementById("deductions").value.trim();

  // Validate inputs
  if (age === "") {
    const ageErrorIcon = document.getElementById("ageError");
    ageErrorIcon.style.display = "inline";
    ageErrorIcon.setAttribute("title", "Age cannot be empty"); // Set the title attribute
  }
  if (income === "" || isNaN(income) || income < 0) {
    const incomeErrorIcon = document.getElementById("incomeError");
    incomeErrorIcon.style.display = "inline";
    incomeErrorIcon.setAttribute("title", "Invalid income value"); // Set the title attribute
  }
  if (extraIncome === "" || isNaN(extraIncome) || extraIncome < 0) {
    const extraIncomeErrorIcon = document.getElementById("extraIncomeError");
    extraIncomeErrorIcon.style.display = "inline";
    extraIncomeErrorIcon.setAttribute("title", "Invalid extra income value"); // Set the title attribute
  }
  if (deductions === "" || isNaN(deductions) || deductions < 0) {
    const deductionsErrorIcon = document.getElementById("deductionsError");
    deductionsErrorIcon.style.display = "inline";
    deductionsErrorIcon.setAttribute("title", "Invalid deductions value"); // Set the title attribute
  }

  // If all inputs are valid, calculate tax and display result
  if (age !== "" && income !== "" && extraIncome !== "" && deductions !== "" &&
      !isNaN(income) && income >= 0 && !isNaN(extraIncome) && extraIncome >= 0 &&
      !isNaN(deductions) && deductions >= 0) {
    const tax = calculateTax(age, parseFloat(income), parseFloat(extraIncome), parseFloat(deductions));
    displayTaxResult(tax);
  }
}

// Calculate tax function
function calculateTax(age, income, extraIncome, deductions) {
  const totalIncome = income + extraIncome - deductions;
  let tax = 0;
  if (totalIncome > 800000) {
    const taxableIncome = totalIncome - 800000;
    if (age === "<40") {
      tax = 0.3 * taxableIncome;
    } else if (age === ">=40&<60") {
      tax = 0.4 * taxableIncome;
    } else if (age === ">=60") {
      tax = 0.1 * taxableIncome;
    }
  }
  return tax;
}

// Display tax result function
function displayTaxResult(tax) {
  const taxResultElement = document.getElementById("calculatedIncome");
  taxResultElement.textContent = "Calculated Tax: " + (tax / 100000).toFixed(2) + " Lakhs";
  showModal();
}

// Close modal when the submit button on the modal is clicked
document.getElementById("submitModalBtn").addEventListener("click", function() {
  closeModal();
});

// Tooltip functions
function showTooltip(id) {
  document.getElementById(id).style.display = "block";
}

function hideTooltip(id) {
  document.getElementById(id).style.display = "none";
}
