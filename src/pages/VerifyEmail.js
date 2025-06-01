import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailCode } from "../Redux/actions/Useraction";

const VerifyEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { message, loading } = useSelector((state) => state.VerifyEmailReducer);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      dispatch(verifyEmailCode(token));
    }
  }, [location.search, dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
      {loading
        ? "🔄 Verifying your email..."
        : message === "Email verified successfully"
        ? "✅ Your email has been verified successfully. Please wait while your license is being reviewed. You will receive an email once the review is complete."
        : message.includes("expired")
        ? "⚠️ This link has expired. A new one has been sent to your email."
        : `❌ ${message}`}
    </div>
  );
};

export default VerifyEmail;
