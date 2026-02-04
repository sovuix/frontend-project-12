export const createChannel = async (name) => {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch("/api/v1/channels", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });

  const text = await response.text();
  console.log("Ответ сервера:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
};

export const deleteChannel = async (id) => {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(`/api/v1/channels/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  
  if (!response.ok) {
    throw new Error("Ошибка при удалении канала");
  }
  
  return response.json();
};

export const renameChannel = async (id, name) => {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(`/api/v1/channels/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  
  if (!response.ok) {
    throw new Error("Ошибка при переименовании канала");
  }
  
  return response.json();
};
