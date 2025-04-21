const dateTime = document.getElementById("date-time");
const reflection = document.getElementById("reflection");
const progressCircle = document.querySelector(".progress-ring-circle");
const progressText = document.getElementById("progress-text");
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

let tasks = [];
let completedTask = 0;

function updateTime() {
  const now = new Date();
  dateTime.textContent = now.toDateString() + " " + now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
  progressText.textContent = `${percent}%`;
}

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, done: false });
    input.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const ul = document.getElementById("todo-list");
  ul.innerHTML = "";
  completedTask = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.style.textDecoration = task.done ? "line-through" : "none";
    li.addEventListener("click", () => toggleTask(index));
    ul.appendChild(li);
    if (task.done) completedTask++;
  });

  updateProgress();
  checkReflectionTrigger();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function updateProgress() {
  if (tasks.length === 0) {
    setProgress(0);
  } else {
    const percent = Math.round((completedTask / tasks.length) * 100);
    setProgress(percent);
  }
}

function checkReflectionTrigger() {
  if (tasks.length > 0 && completedTask === tasks.length) {
    reflection.classList.remove("hidden");
    reflection.classList.add("shown");
  } else {
    reflection.classList.add("hidden");
    reflection.classList.remove("shown");
  }
}
document.querySelectorAll('.emoji').forEach(emoji => {
  emoji.addEventListener('click', () => {
    const existingMsg = document.querySelector('.emoji-response');
    if (!existingMsg) {
      const msg = document.createElement('p');
      msg.textContent = "Thank you for your response!";
      msg.classList.add('emoji-response');
      msg.style.marginTop = "10px";
      msg.style.fontSize = "14px";
      msg.style.color = "#444";
      document.getElementById("reflection").appendChild(msg);
    }
  });
});

// Extra Notes
document.getElementById("saveNoteBtn").addEventListener("click", () => {
  const noteInput = document.getElementById("extraNoteInput");
  const noteText = noteInput.value.trim();
  if (noteText !== "") {
    const li = document.createElement("li");
    li.textContent = noteText;
    document.getElementById("extraNotesList").appendChild(li);
    noteInput.value = "";
  }
});

// Memories Upload
const uploadInput = document.getElementById("memory-upload");
const previewContainer = document.getElementById("memory-preview");
const downloadBtn = document.getElementById("download-collage");

uploadInput.addEventListener("change", function () {
  const files = this.files;
  previewContainer.innerHTML = "";
  downloadBtn.style.display = "none";

  let addedCount = 0;

  Array.from(files).slice(0, 3).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const polaroid = document.createElement("div");
      polaroid.className = "polaroid";

      const img = document.createElement("img");
      img.src = e.target.result;

      const caption = document.createElement("div");
      caption.className = "caption";
      caption.contentEditable = "true";
      caption.innerText = "Write here...";

      polaroid.appendChild(img);
      polaroid.appendChild(caption);
      previewContainer.appendChild(polaroid);

      addedCount++;
      if (addedCount >= 1) {
        downloadBtn.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  });
});

downloadBtn.addEventListener("click", function () {
  html2canvas(previewContainer).then(canvas => {
    const link = document.createElement("a");
    link.download = "my-memories.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});






// Little Wins
function addWin() {
  const winInput = document.getElementById("win-input");
  const winText = winInput.value.trim();
  if (winText !== "") {
    const li = document.createElement("li");
    li.textContent = winText;
    document.getElementById("win-list").appendChild(li);
    winInput.value = "";
  }
}
document.getElementById("download-collage").addEventListener("click", () => {
  // Assuming download logic is already above this

  //  Clear Tasks
  tasks = [];
  renderTasks();

  // Clear Extra Notes
  document.getElementById("extraNoteInput").value = "";
  document.getElementById("extraNotesList").innerHTML = "";

  //  Clear Memories
  document.getElementById("memory-upload").value = "";
  document.getElementById("memory-preview").innerHTML = "";

  //  Clear Little Wins
  document.getElementById("win-input").value = "";
  document.getElementById("win-list").innerHTML = "";

  //  Hide Reflection (if shown)
  const reflection = document.getElementById("reflection");
  reflection.classList.add("hidden");
  reflection.classList.remove("shown");

  //  Reset Progress Text
  document.getElementById("progress-text").textContent = "0%";
 // clear download button
  document.getElementById("downloadCollage").style.display = "none";
});



  