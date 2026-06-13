import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FBFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Blobs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "rgba(124,198,254,0.15)",
          borderRadius: "50%",
          top: "-150px",
          right: "-100px",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "rgba(142,227,214,0.15)",
          borderRadius: "50%",
          bottom: "-100px",
          left: "-100px",
          filter: "blur(80px)",
        }}
      />

      {/* Hero Section */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding:
            "80px 40px 40px 40px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "50px",
        }}
      >
        {/* Left Content */}
        <div
          style={{
            flex: "1",
            minWidth: "320px",
          }}
        >
          <p
            style={{
              color: "#2EC4B6",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            Modern Healthcare Platform
          </p>

          <h1
            style={{
              fontSize: "4.2rem",
              lineHeight: "1",
              color: "#1E293B",
              marginBottom: "20px",
            }}
          >
            Healthcare
            <br />
            made simple.
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748B",
              lineHeight: "1.8",
              maxWidth: "600px",
            }}
          >
            Book appointments, manage
            prescriptions, store medical
            history and connect with
            trusted doctors from one
            platform.
          </p>

          <div
            style={{
              marginTop: "35px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() =>
                navigate("/signup")
              }
              style={{
                background: "#4F9CF9",
                color: "white",
                border: "none",
                padding:
                  "14px 28px",
                borderRadius:
                  "999px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Get Started
            </button>

            <button
              onClick={() =>
                navigate("/doctors")
              }
              style={{
                background:
                  "white",
                color: "#1E293B",
                border:
                  "1px solid #E2E8F0",
                padding:
                  "14px 28px",
                borderRadius:
                  "999px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Explore Doctors
            </button>
          </div>
        </div>

        {/* Right Glass Card */}
        <div
          style={{
            width: "400px",
            background:
              "rgba(255,255,255,0.75)",
            backdropFilter:
              "blur(20px)",
            border:
              "1px solid rgba(255,255,255,0.5)",
            borderRadius: "30px",
            padding: "30px",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#1E293B",
              marginBottom: "25px",
            }}
          >
            Why MediConnect?
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "20px",
              color: "#334155",
            }}
          >
            <div>
              ✓ Book doctor appointments
            </div>

            <div>
              ✓ Track appointment status
            </div>

            <div>
              ✓ Manage prescriptions
            </div>

            <div>
              ✓ Secure medical records
            </div>

            <div>
              ✓ Patient & doctor portals
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 40px 80px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1E293B",
            marginBottom: "70px",
          }}
        >
          Everything You Need In One Place
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background:
  "rgba(255,255,255,0.65)",
backdropFilter: "blur(12px)",
border:
  "1px solid rgba(255,255,255,0.7)",
              padding: "30px",
              minHeight: "180px",
              borderRadius: "20px",
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h3
  style={{
    color: "#4F9CF9",
    marginBottom: "15px",
  }}
>
  Book Appointments
</h3>

            <p>
              Schedule appointments with
              trusted healthcare
              professionals.
            </p>
          </div>

          <div
            style={{
              background:
  "rgba(255,255,255,0.65)",
backdropFilter: "blur(12px)",
border:
  "1px solid rgba(255,255,255,0.7)",
              padding: "30px",
              minHeight: "180px",
              borderRadius: "20px",
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h3
  style={{
    color: "#4F9CF9",
    marginBottom: "15px",
  }}
>
  Track Status
</h3>

            <p>
              Monitor appointment
              approvals and updates in
              real time.
            </p>
          </div>

          <div
            style={{
              background:
  "rgba(255,255,255,0.65)",
backdropFilter: "blur(12px)",
border:
  "1px solid rgba(255,255,255,0.7)",
              padding: "30px",
              minHeight: "180px",
              borderRadius: "20px",
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.06)",
            }}
          >
           <h3
  style={{
    color: "#4F9CF9",
    marginBottom: "15px",
  }}
>
  Doctor Dashboards
</h3>

            <p>
              Doctors can manage patients
              and appointments
              efficiently.
            </p>
          </div>

          <div
            style={{
              background:
  "rgba(255,255,255,0.65)",
backdropFilter: "blur(12px)",
border:
  "1px solid rgba(255,255,255,0.7)",
              padding: "30px",
              minHeight: "180px",
              borderRadius: "20px",
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.06)",
            }}
          >
           <h3
  style={{
    color: "#4F9CF9",
    marginBottom: "15px",
  }}
>
  Medical Records
</h3>

            <p>
              Securely store and access
              healthcare information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;