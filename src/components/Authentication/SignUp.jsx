import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
const HandleSignup = async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) return Swal.fire("Error", "Invalid email format.", "error");
  try {
    setLoading(true);
    const res = await axios.get(BASE_URL);
    if (res.data.some((user) => user.email === email)) {
      Swal.fire("Error", "User already exists! Please log in.", "error");
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password);
    await axios.post(BASE_URL, { id: Date.now(), name, email, method: "email" });
    Swal.fire("Success", "Signup successful! Redirecting...", "success");
    setTimeout(() => setIsSignup(false), 2000);
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  } finally {
    setLoading(false);
  }
};

export default HandleSignup;