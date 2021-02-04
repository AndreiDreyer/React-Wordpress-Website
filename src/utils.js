export async function fetchHelper(endpoint, method, body) {
  const res = await fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}
