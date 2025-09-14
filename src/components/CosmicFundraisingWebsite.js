import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ExternalLink,
  Users,
  Target,
  Gift,
  Star,
} from "lucide-react";

const CosmicFundraisingWebsite = () => {
  const [donations, setDonations] = useState({
    total: 0,
    donors: [],
    milestones: [
      {
        amount: 2000000,
        title: "Cứu trợ khẩn cấp",
        image: "/api/placeholder/300/200",
        completed: false,
      },
      {
        amount: 27000000,
        title: "Xây dựng trường học",
        image: "/api/placeholder/300/200",
        completed: false,
      },
      {
        amount: 34000000,
        title: "Thiết bị y tế",
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
        const mockData = {
          total: 15000000,
          donors: [
            { name: "Nguyễn Văn A", amount: 5000000 },
            { name: "Trần Thị B", amount: 3000000 },
            { name: "Lê Văn C", amount: 2500000 },
            { name: "Phạm Thị D", amount: 2000000 },
            { name: "Hoàng Văn E", amount: 1500000 },
            { name: "Vũ Thị F", amount: 1200000 },
            { name: "Đặng Văn G", amount: 1000000 },
            { name: "Bùi Thị H", amount: 800000 },
            { name: "Ngô Văn I", amount: 600000 },
            { name: "Đinh Thị K", amount: 500000 },
          ],
        };

        const updatedMilestones = donations.milestones.map((milestone) => ({
          ...milestone,
          completed: mockData.total >= milestone.amount,
        }));

        setDonations({
          ...mockData,
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
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getProgressPercentage = () => {
    const maxMilestone = Math.max(...donations.milestones.map((m) => m.amount));
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

  const handleViewFullDonorList = () => {
    // Redirect to full donor list page
    window.location.href = "/full-donor-list"; // Replace with your actual route
  };

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
          className="text-center mb-16"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 text-center
             bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
             bg-clip-text text-transparent animate-pulse"
            style={{
              fontFamily: '"Rowdies","Potta One", sans-serif',
              textShadow:
                "0 0 6px rgba(255, 178, 220, 1), 0 0 16px rgba(171,71,188,0.6), 0 0 22px rgba(244,143,177,0.6)",
              lineHeight: "1.2",
              letterSpacing: "0.05em",
              animation:
                "pulse 2s infinite ease-in-out, glow 3s infinite alternate",
            }}
          >
            QUỸ VƯỜN MÍT <br /> FC MISTHY
          </h1>

          <div className="flex justify-center items-center mt-6 space-x-2">
            <Star className="w-6 h-6 text-yellow-400 animate-spin" />
            {/* <Star className="w-4 h-4 text-yellow-300 animate-pulse" /> */}
            <Star
              className="w-6 h-6 text-yellow-400 animate-spin"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Donation Progress Card */}
        <div
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-12 shadow-2xl glass"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold text-cyan-400 mb-2"
              style={{
                fontFamily: '"Rowdies","Potta One", sans-serif',
                textShadow: `
      0 0 6px rgba(0, 255, 255, 0.9),   /* bright aqua glow */
      0 0 12px rgba(0, 200, 255, 0.7),  /* deeper blue glow */
      0 0 20px rgba(173, 216, 230, 0.6) /* soft light-blue halo */
    `,
                lineHeight: "1.2",
                letterSpacing: "0.05em",
                animation:
                  "pulse 0.5s infinite ease-in-out, glow 3s infinite alternate",
              }}
            >
              SUPPER FEST PROJECT
            </h2>

            <p className="text-4xl font-bold text-white mb-4">
              {formatCurrency(donations.total)}
            </p>
          </div>

          <div className="relative mb-6">
            <div className="w-full bg-gray-700 rounded-full h-6 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${getProgressPercentage()}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
            <div className="text-center text-sm text-gray-300">
              {getProgressPercentage().toFixed(1)}% progress
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {donations.milestones.map((milestone, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-600/30"
              >
                <div
                  className={`text-sm font-semibold mb-2 ${
                    milestone.completed ? "text-green-400" : "text-gray-300"
                  }`}
                >
                  {milestone.title}
                </div>
                <div
                  className={`text-lg font-bold ${
                    milestone.completed ? "text-green-400" : "text-white"
                  }`}
                >
                  {formatCurrency(milestone.amount)}
                </div>
                {milestone.completed && (
                  <Check className="w-6 h-6 text-green-400 mx-auto mt-2 animate-bounce" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3D Carousel Card */}
        <div
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-12 shadow-2xl glass"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
            🎯 Các Hoạt Động Mục Tiêu
          </h2>

          <div className="relative h-96 overflow-hidden">
            <div className="flex items-center justify-center h-full perspective-1000">
              {donations.milestones.map((milestone, index) => {
                const isActive = index === currentSlide;
                const offset =
                  (index - currentSlide + donations.milestones.length) %
                  donations.milestones.length;
                const isNext =
                  offset === 1 || offset === donations.milestones.length - 1;

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-700 ease-in-out transform-gpu ${
                      isActive
                        ? "translate-x-0 scale-100 z-20 opacity-100"
                        : isNext
                        ? "translate-x-64 scale-75 z-10 opacity-60"
                        : "translate-x-32 scale-50 z-0 opacity-30"
                    }`}
                    style={{
                      transform: `
                        translateX(${(offset - 2) * 200}px) 
                        scale(${isActive ? 1 : 0.7}) 
                        rotateY(${(offset - 2) * 15}deg)
                        translateZ(${isActive ? 0 : -100}px)
                      `,
                    }}
                  >
                    <div className="bg-gray-800/80 rounded-2xl p-6 w-80 h-80 flex flex-col items-center justify-center border border-gray-600/50 backdrop-blur-sm">
                      <div className="w-48 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20" />
                        <span className="text-white font-bold z-10">
                          Hình ảnh
                        </span>
                        {milestone.completed && (
                          <div className="absolute top-2 right-2">
                            <Check className="w-8 h-8 text-green-400 bg-green-900/80 rounded-full p-1 animate-bounce" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 text-center">
                        {milestone.title}
                      </h3>
                      <p className="text-cyan-400 font-semibold">
                        {formatCurrency(milestone.amount)}
                      </p>
                      <div
                        className={`mt-2 px-3 py-1 rounded-full text-sm ${
                          milestone.completed
                            ? "bg-green-900/50 text-green-400 border border-green-500/50"
                            : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                        }`}
                      >
                        {milestone.completed
                          ? "✅ Đã hoàn thành"
                          : "⏳ Đang thực hiện"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500 rounded-full p-3 transition-colors z-30 backdrop-blur-sm border border-purple-400/50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500 rounded-full p-3 transition-colors z-30 backdrop-blur-sm border border-purple-400/50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {donations.milestones.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-purple-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Top 10 Donors Card */}
        <div
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mb-12 shadow-2xl glass"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-yellow-400">
              🏆 Top 10 Nhà Hảo Tâm
            </h2>
          </div>

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
                <div className="flex items-center">
                  <span
                    className={`text-2xl mr-3 ${
                      index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "💎"
                    }`}
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
                    <div className="font-semibold text-white">{donor.name}</div>
                    <div className="text-sm text-gray-300">#{index + 1}</div>
                  </div>
                </div>
                <div
                  className={`font-bold ${
                    index < 3 ? "text-yellow-400" : "text-cyan-400"
                  }`}
                >
                  {formatCurrency(donor.amount)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleViewFullDonorList}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center mx-auto"
            >
              <Gift className="w-5 h-5 mr-2" />
              Xem danh sách đầy đủ
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Bank Transfer Info Card */}
        <div
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 shadow-2xl glass"
          style={{ transform: `translateY(${scrollY * 0.01}px)` }}
        >
          <h2 className="text-3xl font-bold text-center text-green-400 mb-8">
            💳 Thông Tin Chuyển Khoản
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  Thông Tin Tài Khoản
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-300">Số tài khoản:</span>
                    <div className="text-2xl font-bold text-white bg-gray-700/50 rounded-lg p-3 mt-1 font-mono">
                      0123 456 789
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Chủ tài khoản:</span>
                    <div className="text-lg font-semibold text-white">
                      QUỸ TỪ THIỆN NHÂN ÁI
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Ngân hàng:</span>
                    <div className="text-lg font-semibold text-white">
                      Vietcombank - CN HCM
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      Nội dung chuyển khoản:
                    </span>
                    <div className="text-lg text-yellow-400">
                      Ủng hộ + Tên + SĐT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-xl p-6 inline-block border border-gray-300">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm">QR Code</div>
                    <div className="text-xs">Chuyển khoản nhanh</div>
                  </div>
                </div>
                <p className="text-gray-800 font-semibold">
                  Quét mã để chuyển khoản
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300 max-w-2xl mx-auto">
              Mọi khoản đóng góp đều được ghi nhận và sử dụng minh bạch cho các
              hoạt động từ thiện. Cảm ơn tấm lòng hảo tâm của bạn! ❤️
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-gray-400">Cảm ơn sự ủng hộ của bạn</span>
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicFundraisingWebsite;
