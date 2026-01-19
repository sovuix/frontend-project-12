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
