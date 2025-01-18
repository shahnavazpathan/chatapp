const signOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: "0" });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signOut;
