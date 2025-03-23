import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUser, updateUser } from "../../Services/users";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
    const defaultProfile = {
        profilePic: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    };
    const location = useLocation();
    const userid = location.state.id;
    const [user, setUser] = useState({});
    const storedProfile = localStorage.getItem(`user_${userid}`);
    const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {};
    const [profile, setProfile] = useState({ ...defaultProfile, ...parsedProfile });
    const [editing, setEditing] = useState(false);
    const [tempProfile, setTempProfile] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUser(userid);
            setUser(data);
            setProfile({ ...defaultProfile, ...parsedProfile, ...data });
        };
        fetchUserData();
    }, [userid]);

    useEffect(() => {
        if (user.id) {
            localStorage.setItem(
                `user_${user.id}`,
                JSON.stringify({
                    profilePic: profile.profilePic,
                })
            );
        }
    }, [user.id, profile.profilePic]);

    const handleChange = (e) => {
        setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile({ ...tempProfile, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProfile = { ...profile, ...tempProfile };

        localStorage.setItem(
            `user_${user.id}`,
            JSON.stringify({ profilePic: updatedProfile.profilePic })
        );

        await updateUser(user.id, {
            ...user,
            occupation: updatedProfile.occupation,
            role: updatedProfile.role,
            experience: updatedProfile.experience,
            location: updatedProfile.location,
            phone: updatedProfile.phone,
        });
        setProfile(updatedProfile);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
        setTempProfile({});
    };

    const loginDate = user?.id
        ? new Date(Number(user?.id)).toLocaleDateString()
        : "N/A";

    return (
        <div className="container position-relative mt-3" style={{ margin: "auto" }}>
            {editing && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 backdrop-blur" style={{ zIndex: 10 }}></div>
            )}

            <div className="position-relative bg-primary text-white rounded-top text-center" style={{ height: "140px" }}></div>

            <div className="text-center" style={{ marginTop: "-70px" }}>
                <div className="d-inline-block position-relative border border-4 border-white rounded-circle overflow-hidden" style={{ width: "140px", height: "140px" }}>
                    <img src={profile.profilePic} alt="Profile" className="w-100 h-100 object-fit-cover" />
                </div>
            </div>

            <div className="text-center mt-3">
                <h4 className="fw-bold">{profile.name?.toUpperCase() || "Employee Name"}</h4>
                <p className="text-muted">{profile.occupation || "Not Updated"}</p>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="p-3 shadow-sm rounded bg-light">
                        <h5 className="fw-bold">Personal Information</h5>
                        <p>📍<strong>Location: </strong>{profile.location || "Not Updated"}</p>
                        <p>📞 {profile.phone || "Not Updated"}</p>
                        <p>📅 Joined <strong>{loginDate || "N/A"}</strong></p>
                        <p><strong>Authentication Method:</strong> {profile.method || "N/A"}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-3 shadow-sm rounded bg-light">
                        <h5 className="fw-bold">Work Information</h5>
                        <p><strong>Email:</strong> {profile.email || "N/A"}</p>
                        <p><strong>Role:</strong> {profile.role || "N/A"}</p>
                        <p><strong>Experience:</strong> {profile.experience || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-3">
                <button onClick={() => setEditing(true)} className="btn btn-dark btn-sm">
                    Edit Profile
                </button>
            </div>

            {editing && (
                <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow" style={{ zIndex: 20, width: "350px" }}>
                    <form onSubmit={handleSubmit}>
                        <h5 className="text-center fw-bold mb-3">Edit Profile</h5>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Profile Picture</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
                            <input
                                type="text"
                                name="profilePic"
                                value={tempProfile.profilePic || ""}
                                onChange={handleChange}
                                placeholder="Paste Image URL"
                                className="form-control mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Occupation</label>
                            <select
                                name="occupation"
                                value={tempProfile.occupation || ""}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Select Occupation</option>
                                <option value="Employee">Employee</option>
                                <option value="Student">Student</option>
                                <option value="Freelancer">Freelancer</option>
                                <option value="Business Owner">Business Owner</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={tempProfile.role || ""}
                                onChange={handleChange}
                                placeholder="Enter your role (e.g., Developer, Designer)"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Experience</label>
                            <select
                                name="experience"
                                value={tempProfile.experience || ""}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Select Experience</option>
                                <option value="Fresher">Fresher</option>
                                <option value="1-2 years">1-2 years</option>
                                <option value="3-5 years">3-5 years</option>
                                <option value="6-10 years">6-10 years</option>
                                <option value="10+ years">10+ years</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={tempProfile.location || ""}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Phone Number</label>
                            <input
                                type="number"
                                name="phone"
                                value={tempProfile.phone || ""}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button type="button" onClick={handleCancel} className="btn btn-danger w-45">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary w-45">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;