
const UserAPI = {
  signup(name, email, password) {
    return fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    .then(res => res.json())
  },
  sigin(email, password) {

  },
  signout() {

  }
}