// export const createChannel = async (name) => {
//   const token = localStorage.getItem("jwToken");
//   const response = await fetch("/api/v1/channels", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message);
//   }

//   return await response.json();
// };

export const createChannel = async (name) => {
  // Временная упрощенная версия - точная копия работающего GET
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
