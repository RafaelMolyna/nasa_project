const API_URL = (route) => `http://localhost:8000/v1${route}`;

async function httpGetPlanets() {
  const res = await fetch(API_URL("/planets"));
  const data = await res.json();
  return data;
}

async function httpGetLaunches() {
  const res = await fetch(API_URL("/launches"));
  const data = await res.json();
  return data;
}

async function httpSubmitLaunch(launch) {
  try {
    const resp = await fetch(API_URL("/launches"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
    return resp;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    const resp = await fetch(API_URL(`/launches/${id}`), {
      method: "DELETE",
    });
    return resp;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
