/* 
 * Lavellune Main JavaScript File
 * Handles: Timers, To-Do Lists, Affirmations
 */

document.addEventListener("DOMContentLoaded", () => {
  /* 
   * ====== TIMER FUNCTIONALITY ======
   * Controls the Pomodoro timer with start, pause, and reset functionality
   */
  const timerEl = document.getElementById("timer");
  const startBtn = document.querySelector("[data-action='start']");
  const pauseBtn = document.querySelector("[data-action='pause']");
  const resetBtn = document.querySelector("[data-action='reset']");

  // Default to 25 minutes (Pomodoro technique)
  const DEFAULT_MIN = 25;
  let secondsLeft = DEFAULT_MIN * 60;
  let countdown = null;

  // Update the timer display
  const renderTime = () => {
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;
  };

  // Timer tick function - decrements the timer each second
  const tick = () => {
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      countdown = null;
      return;
    }
    secondsLeft--;
    renderTime();
  };

  // Event listeners for timer controls
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (!countdown) {
        countdown = setInterval(tick, 1000);
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      clearInterval(countdown);
      countdown = null;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      secondsLeft = DEFAULT_MIN * 60;
      renderTime();
      clearInterval(countdown);
      countdown = null;
    });
  }

  // Initialize timer display
  if (timerEl) renderTime();

  /* 
   * ====== TO-DO LIST FUNCTIONALITY ======
   * Manages task creation, completion, and persistence per mood
   */
  const body = document.body;
  const mood = ["calm", "focus", "energize", "relax", "motivate", "reflect"]
    .find(m => body.classList.contains(m)) || "calm";

  const key = `lavellune-tasks-${mood}`;
  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  const listEl = document.getElementById("taskList");
  let tasks = JSON.parse(localStorage.getItem(key)) || [];

  // Save tasks to localStorage
  const saveTasks = () => localStorage.setItem(key, JSON.stringify(tasks));

  // Render all tasks to the DOM
  const renderTasks = () => {
    if (!listEl) return;
    
    listEl.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="checkbox" ${task.done ? "checked" : ""}>
          <span>${task.text}</span>
        </label>
        <button aria-label="delete">&times;</button>
      `;
      
      if (task.done) li.classList.add("done");

      // Toggle task completion
      li.querySelector("input").addEventListener("change", () => {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      });

      // Delete task
      li.querySelector("button").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      listEl.appendChild(li);
    });
  };

  // Add new task
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!input.value.trim()) return;
      
      tasks.push({
        text: input.value.trim(),
        done: false
      });
      
      input.value = "";
      saveTasks();
      renderTasks();
    });
  }

  // Initialize tasks display
  renderTasks();

  /* 
   * ====== AFFIRMATIONS FUNCTIONALITY ======
   * Displays and rotates mood-specific affirmations
   */
  const BANK = {
    calm: [
      "You are safe. You are whole.",
      "Inhale calm, exhale tension.",
      "Gentle progress is still progress."
    ],
    focus: [
      "Your attention is powerful.",
      "One thought at a time.",
      "Clarity grows with patience."
    ],
    energize: [
      "You are electric with purpose.",
      "Your energy fuels your dream.",
      "Every step lights your path."
    ],
    relax: [
      "Stillness is sacred.",
      "You are allowed to rest.",
      "Quiet moments restore your light."
    ],
    motivate: [
      "You can do hard things.",
      "Action builds momentum.",
      "You're closer than you think."
    ],
    reflect: [
      "Reflection brings growth.",
      "Honor your path by noticing it.",
      "Insight comes with silence."
    ]
  };

  const affEl = document.getElementById("affirmationText");
  if (affEl) {
    let affIndex = 0;
    
    // Swap to next affirmation with fade effect
    const swapAffirmation = () => {
      affEl.style.opacity = 0;
      setTimeout(() => {
        affIndex = (affIndex + 1) % BANK[mood].length;
        affEl.textContent = BANK[mood][affIndex];
        affEl.style.opacity = 1;
      }, 400);
    };

    // Initialize and rotate affirmations
    affEl.textContent = BANK[mood][0];
    affEl.style.opacity = 1;
    setInterval(swapAffirmation, 6000);
  }
});