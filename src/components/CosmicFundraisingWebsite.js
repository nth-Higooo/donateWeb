/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Check, Users, Star } from "lucide-react";
import CountUp from "react-countup";
import DonationSection from "./DonateSection";

const CosmicFundraisingWebsite = () => {
  const [donations, setDonations] = useState({
    total: 0,
    donors: [],
    // Milestones
    milestones: [
      {
        amount: 1250000,
        title: "QUÀ KHAI TRƯƠNG",
        image: "/api/placeholder/300/200",
        completed: true,
      },
      {
        amount: 19000000,
        title: "BOOTH CHECKIN",
        image: "/api/placeholder/300/200",
        completed: null,
      },
      {
        amount: 7000000,
        title: "LỀU & GIFT MINI GAME",
        image: "/api/placeholder/300/200",
        completed: null,
      },
      {
        amount: null, // mốc cuối để ?????????
        title: "SINH NHẬT",
        image: "/api/placeholder/300/200",
        completed: false,
      },
    ],
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Google Sheets API integration
  useEffect(() => {
    const fetchDataFromGoogleSheets = async () => {
      try {
        // Replace with your actual Google Sheets API configuration
        // const SHEET_ID = 'your-google-sheet-id';
        // const API_KEY = 'your-google-api-key';
        // const SHEET_NAME = 'Sheet1';
        // const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

        // const response = await fetch(url);
        // const data = await response.json();

        // For now, using mock data - replace this with actual API call

        const updatedMilestones = donations.milestones.map((milestone) => ({
          ...milestone,
        }));

        setDonations({
          milestones: updatedMilestones,
        });
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchDataFromGoogleSheets();

    // Set up periodic refresh every 5 minutes
    const interval = setInterval(fetchDataFromGoogleSheets, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  // đặt dưới cùng file hoặc trong 1 file config riêng
  const API_KEY = "AIzaSyADK7u-ptZPZZSpRnS-RQk1vgcIRRgd46w";
  const SPREADSHEET_ID = "108os02dE_gkQXClS9YOnAF84GPsg4S-FEyxD4O3urYI";
  const SHEET_NAME = "Sheet1";

  useEffect(() => {
    const fetchDataFromGoogleSheets = async () => {
      try {
        const range = `'${SHEET_NAME}'!A1:Z1000`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(
          range
        )}?key=${API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        if (!data.values) {
          console.warn("⚠️ No values found in sheet");
          return;
        }

        const rows = data.values;

        // 1. Tổng tiền
        const totalRow = rows.find((r) => r.includes("TOTAL"));
        console.log("totalRow", totalRow);
        let total = 0;
        let updateTime;
        if (totalRow) {
          updateTime = totalRow[1] || "Không tìm thấy";
          const totalStr = totalRow[3] || "0"; // ✅ always column 3
          total = parseInt(totalStr.replace(/[^\d]/g, "")) || 0;
        }

        // 2. Donors list
        const donorRows = rows.slice(3);

        const donors = donorRows
          .map((r) => {
            const name = r[1] || "";
            const amountStr = r[3] || "0";
            const amount = parseInt(amountStr.replace(/[^\d]/g, "")) || 0;
            return name && amount > 0 ? { name, amount } : null;
          })
          .filter(Boolean)
          .slice(0, 10);

        // 3. HOA SEN Fund
        const hoaSenRow = rows.find((r) => r.includes("HOA SEN"));

        let hoaSenFund = 0;
        if (hoaSenRow) {
          const fundStr = hoaSenRow[2] || "0"; // ✅ always column 2
          hoaSenFund = parseInt(fundStr.replace(/[^\d]/g, "")) || 0;
        }

        setDonations((prev) => ({
          ...prev, // keep existing state
          total,
          donors,
          hoaSenFund,
          updateTime,
          milestones: prev.milestones, // keep your milestone.completed values
        }));
      } catch (error) {
        console.error("❌ Error fetching data from Google Sheets:", error);
      }
    };

    fetchDataFromGoogleSheets();
    const interval = setInterval(fetchDataFromGoogleSheets, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % donations.milestones.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [donations.milestones.length]);

  const formatCurrency = (amount) => {
    if (amount == null) return "0 VND";
    return amount.toLocaleString("en-US") + " VND";
  };

  const getProgressPercentage = () => {
    // const validMilestones = donations.milestones.filter((m) => m.amount);
    // const maxMilestone = Math.max(...validMilestones.map((m) => m.amount));
    const maxMilestone = 28000000;
    return Math.min((donations.total / maxMilestone) * 100, 100);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % donations.milestones.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + donations.milestones.length) % donations.milestones.length
    );
  };
  const milestoneImages = [
    "/option2/1.png",
    "/option2/2.png",
    "/option2/3.png",
    "/option2/4.png",
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translateY(${
                scrollY * (0.1 + Math.random() * 0.2)
              }px)`,
            }}
          />
        ))}
      </div>

      {/* Floating cosmic elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${
              scrollY * 0.1
            }deg)`,
          }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${
              -scrollY * 0.1
            }deg)`,
          }}
        />
        <div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-15 blur-2xl"
          style={{
            transform: `translateY(${scrollY * 0.1}px) scale(${
              1 + Math.sin(scrollY * 0.01) * 0.1
            })`,
          }}
        />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-4 py-8"
      >
        {/* Website Title */}
        <div
          className="text-center mb-8"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <h1
            className="text-center font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse"
            style={{
              fontFamily: '"Rowdies","Potta One", sans-serif',
              textShadow:
                "0 0 6px rgba(252, 252, 252, 1), 0 0 16px rgba(255, 105, 210, 0.7), 0 0 22px rgba(148, 70, 96, 0.44)",
              lineHeight: "1.2",
              letterSpacing: "0.05em",
              animation:
                "pulse 2s infinite ease-in-out, glow 3s infinite alternate",
              fontSize: "clamp(1.8rem, 4vw, 3rem)", // ✅ responsive
            }}
          >
            QUỸ VƯỜN MÍT <br /> FC MISTHY
          </h1>

          <div className="flex justify-center items-center mt-6 space-x-2">
            <Star className="w-6 h-6 text-yellow-400 animate-spin" />
            <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
            <Star
              className="w-6 h-6 text-yellow-400 animate-spin"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Donation Progress Card */}
        <div
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-5 mb-12 shadow-2xl glass  justify-center mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            p: { xs: 3, sm: 5 },
            borderRadius: "20px",
            backgroundColor: "rgba(0,0,0,0.6)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            width: "100%",
            maxWidth: "900px", // ✅ keep card centered and not too wide
          }}
        >
          <div className="text-center mb-8">
            <h1
              className="font-bold text-center"
              style={{
                fontFamily: '"Rowdies","Potta One", sans-serif',
                textShadow: `
      0 0 6px rgba(113, 255, 255, 1),
      0 0 12px rgba(0, 200, 255, 0.7),
      0 0 20px rgba(230, 249, 255, 0.13)
    `,
                lineHeight: "1.2",
                letterSpacing: "0.05em",
                animation:
                  "pulse 0.8s infinite ease-in-out, glow 3s infinite alternate",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)", // ✅ responsive
              }}
            >
              SUPPERFES PROJECT
            </h1>

            <p
              className="font-bold text-white mb-4 mt-4 text-center"
              style={{
                fontFamily: "Goldman",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)", // ✅ responsive số tiền
              }}
            >
              {formatCurrency(donations.total)}
            </p>
          </div>

          <div className="relative mb-6">
            <div className="w-full bg-gray-700 rounded-full h-6 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{
                  width: `${getProgressPercentage()}%`,
                  fontFamily: "Goldman",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
                  style={{ animationDelay: "1s", fontFamily: "Goldman" }}
                />
              </div>
            </div>
            <div
              className="text-center text-sm text-gray-300"
              style={{
                fontFamily: "Goldman",
                fontSize: "1.2em",
              }}
            >
              {getProgressPercentage().toFixed(1)}% progress
            </div>
          </div>
          {/* 
{/* 3D Carousel Card */}
          <div
            className="bg-black/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl mb-1 shadow-2xl glass"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          >
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(250px, 60vw, 400px)" }}
            >
              <div className="flex items-center justify-center h-full perspective-1000">
                {donations.milestones.map((milestone, index) => {
                  const imageSrc =
                    milestoneImages[index] || "/option2/default.png";
                  const isActive = index === currentSlide;
                  const offset =
                    (index - currentSlide + donations.milestones.length) %
                    donations.milestones.length;

                  let position = offset;
                  if (offset > donations.milestones.length / 2) {
                    position = offset - donations.milestones.length;
                  }

                  return (
                    <div
                      key={index}
                      className="absolute transition-all duration-700 ease-in-out transform-gpu"
                      style={{
                        left: "50%", // luôn xuất phát từ giữa
                        transform: `
          translateX(calc(${position} * clamp(200px, 15vw, 350px) - 50%)) 
          scale(${isActive ? 1 : 0.65})
          rotateY(${position * 5}deg)
          translateZ(${isActive ? 0 : -60}px)
        `,
                        zIndex: isActive ? 20 : 10 - Math.abs(position),
                        opacity: isActive ? 1 : 0.5,
                      }}
                    >
                      <div
                        className="bg-gray-800/80 rounded-2xl p-2 flex flex-col items-center justify-center border border-gray-600/50 backdrop-blur-sm"
                        style={{
                          width: "clamp(180px, 70vw, 220px)",
                          height: "clamp(200px, 55vw, 320px)",
                        }}
                      >
                        {/* Image Box */}
                        <div
                          className="rounded-lg mb-4 flex items-center justify-center relative overflow-hidden border border-gray-500/40"
                          style={{
                            width: "clamp(140px, 70vw, 200px)",
                            height: "clamp(140px, 45vw, 250px)",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/20" />
                          {milestone.image ? (
                            <img
                              src={imageSrc}
                              alt={milestone.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <span
                                className="text-white font-bold z-10"
                                style={{
                                  fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
                                }}
                              >
                                Hình ảnh
                              </span>
                            </div>
                          )}

                          {milestone.completed && (
                            <div className="absolute top-2 right-2">
                              <Check
                                className="text-green-400 bg-green-900/80 rounded-full p-1 animate-bounce"
                                style={{
                                  width: "clamp(18px, 4vw, 24px)",
                                  height: "clamp(18px, 4vw, 24px)",
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          className="font-bold text-white mb-1 text-center"
                          style={{
                            fontFamily: "Goldman",
                            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                          }}
                        >
                          {milestone.title}
                        </h3>

                        {/* Amount */}
                        <p
                          className={
                            milestone.amount
                              ? "text-cyan-400 font-semibold"
                              : "text-red-400 font-bold"
                          }
                          style={{
                            fontFamily: "Goldman",
                            fontSize: milestone.amount
                              ? "clamp(0.9rem, 2vw, 1.2rem)"
                              : "clamp(1.2rem, 3vw, 1.6rem)",
                          }}
                        >
                          {milestone.amount
                            ? formatCurrency(milestone.amount)
                            : "???????"}
                        </p>

                        {/* Status */}
                        <div
                          className={`mt-2 px-3 py-1 rounded-full ${
                            milestone.completed === true
                              ? "bg-green-900/50 text-green-400 border border-green-500/50"
                              : milestone.completed === null
                              ? "bg-yellow-900/50 text-yellow-400 border border-yellow-500/50"
                              : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                          }`}
                          style={{
                            fontFamily: "Goldman",
                            fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
                          }}
                        >
                          {milestone.completed === true
                            ? "✅ Completed ✅"
                            : milestone.completed === null
                            ? "💰 Funding 💰"
                            : "⏳ Pending ⏳"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500 rounded-full p-3 transition-colors z-30 backdrop-blur-sm border border-purple-400/50"
              >
                <ChevronLeft
                  style={{
                    width: "clamp(20px, 5vw, 28px)",
                    height: "clamp(20px, 5vw, 28px)",
                  }}
                />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500 rounded-full p-3 transition-colors z-30 backdrop-blur-sm border border-purple-400/50"
              >
                <ChevronRight
                  style={{
                    width: "clamp(20px, 5vw, 28px)",
                    height: "clamp(20px, 5vw, 28px)",
                  }}
                />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {donations.milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-colors ${
                    currentSlide === index ? "bg-purple-400" : "bg-gray-600"
                  }`}
                  style={{
                    width: "clamp(8px, 2vw, 12px)",
                    height: "clamp(8px, 2vw, 12px)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="bg-black/30 backdrop-blur-lg border border-pink-500/30 rounded-3xl p-6 mb-12 shadow-2xl glass text-center mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.04}px)`,
            p: { xs: 3, sm: 5 },
            borderRadius: "20px",
            backgroundColor: "rgba(0,0,0,0.6)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            width: "100%",
            maxWidth: "900px", // ✅ keep card centered and not too wide
          }}
        >
          <h2
            className="font-bold mb-4 text-pink-400"
            style={{
              fontFamily: '"Rowdies","Potta One", sans-serif',
              fontSize: "clamp(1.2rem, 3vw, 2.5rem)", // ✅ responsive title
            }}
          >
            QUỸ MÁI ẤM GIA ĐÌNH VIỆT
          </h2>

          <div
            className="font-extrabold text-yellow-400 drop-shadow-lg"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", // ✅ responsive số tiền
              fontFamily: "Goldman",
            }}
          >
            <CountUp
              end={donations.hoaSenFund}
              duration={5}
              separator=","
              suffix=" VND"
            />
          </div>
        </div>

        {/* Top 10 Donors Card */}
        <div
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-12 shadow-2xl glass mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
            p: { xs: 3, sm: 5 },
            borderRadius: "20px",
            backgroundColor: "rgba(0,0,0,0.6)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            width: "100%",
            maxWidth: "900px", // ✅ keep card centered and not too wide
          }}
        >
          <div className="text-center mb-8">
            <Users
              className="mx-auto mb-4 animate-pulse text-yellow-400"
              style={{
                width: "clamp(24px, 6vw, 32px)",
                height: "clamp(24px, 6vw, 32px)",
              }}
            />
            <h2
              className="font-bold mb-4 text-yellow-400"
              style={{
                fontFamily: '"Rowdies","Potta One", sans-serif',
                fontSize: "clamp(1.2rem, 3vw, 2.5rem)", // ✅ responsive title
              }}
            >
              🏆 TOP 10 DONORS 🏆
            </h2>

            {/* Footer */}
            <div className="text-center mx-auto">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <span
                  className="text-gray-200"
                  style={{ fontFamily: "Goldman" }}
                >
                  Cập nhật lần cuối: {donations.updateTime}
                </span>
              </div>
            </div>
          </div>

          {donations.donors ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {donations.donors.map((donor, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-105 ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 border-yellow-500/50"
                      : index === 1
                      ? "bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-gray-400/50"
                      : index === 2
                      ? "bg-gradient-to-r from-amber-900/50 to-amber-800/50 border-amber-500/50"
                      : "bg-gray-800/50 border-gray-600/30"
                  }`}
                >
                  {/* Rank icon */}
                  <div className="flex items-center">
                    <span
                      className="mr-3"
                      style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }} // ✅ responsive icon size
                    >
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "💎"}
                    </span>
                    <div>
                      <div
                        className="font-semibold text-white"
                        style={{
                          fontFamily: "Goldman",
                          fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)", // ✅ responsive donor name
                        }}
                      >
                        {donor.name}
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div
                    className={`font-bold ${
                      index < 3 ? "text-yellow-400" : "text-cyan-400"
                    }`}
                    style={{
                      fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)", // ✅ responsive amount
                    }}
                  >
                    {formatCurrency(donor.amount)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Chưa có thông tin</p>
          )}

          {/* Button */}
          <div className="text-center">
            <button
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1arWnOUafQu4oFohvOWF1zRZab504pB8cHIberd0gR9E/edit?gid=57279958#gid=57279958",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center mx-auto"
              style={{
                fontFamily: "Goldman",
                padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(1.5rem, 5vw, 2rem)", // ✅ responsive padding
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", // ✅ responsive text
              }}
            >
              Full List Donors
            </button>
          </div>
        </div>

        <DonationSection />
      </div>
    </div>
  );
};

export default CosmicFundraisingWebsite;
