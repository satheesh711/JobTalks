import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const HandleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return Swal.fire("Error", "Invalid email format.", "error");
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      const user = res.data.find((user) => user.email === email && user.method === "email");
      if (!user) {
        Swal.fire("Error", "No account found. Please sign up.", "error");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(user));
      Swal.fire("Success", "Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      Swal.fire("Error", "Invalid credentials.", "error");
    } finally {
      setLoading(false);
    }
  };
export default HandleLogin;
