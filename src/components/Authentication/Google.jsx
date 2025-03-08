import {
    signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";
const HandleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      const res = await axios.get(BASE_URL);
      const user = res.data.find((user) => user.email === userEmail && user.method === "google");
      if (!user) {
        await axios.post(BASE_URL, { id: Date.now(), name: result.user.displayName, email: userEmail, method: "google" });
      }
      Swal.fire("Success", "Google login successful! Redirecting...", "success");
      localStorage.setItem("user", JSON.stringify(user || result.user));
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
export default HandleGoogleLogin;
