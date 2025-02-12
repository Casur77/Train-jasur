function updateGraph() {
  const pmSquats = parseFloat(document.getElementById("pm_squats").value);
  const pmDeadlift = parseFloat(document.getElementById("pm_deadlift").value);
  const pmBench = parseFloat(document.getElementById("pm_bench").value);
  const exerciseType = document.getElementById("exercise_type").value;

  if (isNaN(pmSquats) || isNaN(pmDeadlift) || isNaN(pmBench)) {
    alert("Введите корректные значения для всех ПМ!");
    return;
  }

  const tableBody = document.querySelector("#graph tbody");
  tableBody.innerHTML = ""; // Очистить таблицу

  // Данные программы по неделям и дням (11 недель, 2 тренировки в неделю)
  const program = [
    { week: 1, day: 1, percent: 60, sets: "3×5" },
    { week: 1, day: 2, percent: 50, sets: "3×5" },
    { week: 2, day: 1, percent: 70, sets: "3×5" },
    { week: 2, day: 2, percent: 50, sets: "3×5" },
    { week: 3, day: 1, percent: 75, sets: "3×5" },
    { week: 3, day: 2, percent: 60, sets: "3×5" },
    { week: 4, day: 1, percent: 80, sets: "3×3, 2×2, 1×2" },
    { week: 4, day: 2, percent: 60, sets: "3×5" },
    { week: 5, day: 1, percent: 85, sets: "2×2, 1×2" },
    { week: 5, day: 2, percent: 70, sets: "3×5" },
    { week: 6, day: 1, percent: 90, sets: "1×3" },
    { week: 6, day: 2, percent: 70, sets: "2×5" },
    { week: 7, day: 1, percent: 95, sets: "1×3" },
    { week: 7, day: 2, percent: 70, sets: "2×4" },
    { week: 8, day: 1, percent: 95, sets: "1×4" },
    { week: 8, day: 2, percent: 70, sets: "2×3" },
    { week: 9, day: 1, percent: 100, sets: "1×2" },
    { week: 9, day: 2, percent: 80, sets: "2×4" },
    { week: 10, day: 1, percent: 90, sets: "2×3" },
    { week: 10, day: 2, percent: 70, sets: "3×3" },
    { week: 11, day: 1, percent: 105, sets: "1×1" }
  ];

  program.forEach(session => {
    let weight = 0;
    let exerciseName = "";

    if (exerciseType === "squats") {
      weight = pmSquats * session.percent / 100;
      exerciseName = "Приседания";
    } else if (exerciseType === "deadlift") {
      weight = pmDeadlift * session.percent / 100;
      exerciseName = "Тяга в наклоне";
    } else if (exerciseType === "bench") {
      weight = pmBench * session.percent / 100;
      exerciseName = "Жим лёжа";
    }

    // Для расчета общего тоннажа: необходимо вычислить общее число повторений.
    // Функция parseSets разбирает строку, содержащую комбинации, например "3×3, 2×2, 1×2"
    function parseSets(setsString) {
      return setsString.split(',')
             .map(item => {
               let parts = item.trim().split('×');
               if (parts.length === 2) {
                 return parseInt(parts[0]) * parseInt(parts[1]);
               }
               return 0;
             })
             .reduce((sum, current) => sum + current, 0);
    }

    const totalReps = parseSets(session.sets);
    const tonnage = weight * totalReps;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${session.week}</td>
      <td>День ${session.day}</td>
      <td>${exerciseName}</td>
      <td>${session.percent}%</td>
      <td>${weight.toFixed(1)}</td>
      <td>${session.sets}</td>
      <td>${tonnage.toFixed(1)}</td>
    `;
    tableBody.appendChild(row);
  });
}

updateGraph();