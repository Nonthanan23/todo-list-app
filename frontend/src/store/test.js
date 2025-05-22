import axios from "axios";

const fetchTasks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/tasks");
    setTasks(response.data); // Lagrar de hämtade uppgifterna i tillståndet
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
