// src/components/DonationSection.tsx
import { Box, Card, Typography, Grid } from "@mui/material";
import { Star } from "lucide-react";

export default function DonationSection() {
  return (
    <Box sx={{ py: 6 }} className="flex justify-center px-4">
      <Card
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: "20px",
          backgroundColor: "rgba(0,0,0,0.6)",
          // border: "1px solid rgba(236,72,153,0.3)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "900px", // ✅ keep card centered and not too wide
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 6,
            fontSize: { xs: "16px", sm: "25px" },
            fontFamily: "Goldman, serif",
            color: "rgba(255, 255, 255, 0.9)",
            WebkitTextStroke: "1px #fff",
          }}
        >
          💳 DONATE INFORMATION 💳
        </Typography>

        <Grid container spacing={6} justifyContent="center" alignItems="center">
          {/* Quỹ 1 */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 2,
                maxWidth: 300,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: { xs: "1.2em", sm: "1.4em" },
                    fontWeight: "bold",
                    color: "whitesmoke",
                    mb: 1,
                  }}
                >
                  SUPERFEST
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: "0.9em",
                    color: "whitesmoke",
                  }}
                >
                  VIETCOMBANK THANH DA
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: "0.9em",
                    color: "whitesmoke",
                  }}
                >
                  053 100 258 3237
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: "0.9em",
                    color: "whitesmoke",
                  }}
                >
                  TRAN HOANG PHUONG LINH
                </Typography>
              </Box>
              <Box>
                <img
                  src="/QRcode.svg"
                  alt="QR Quỹ Supper Fest"
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Quỹ 2 */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 2,
                maxWidth: 300,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: { xs: "1.2em", sm: "1.4em" },
                    fontWeight: "bold",
                    color: "whitesmoke",
                    mb: 1,
                  }}
                >
                  MÁI ẤM GIA ĐÌNH VIỆT
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: "0.9em",
                    color: "whitesmoke",
                  }}
                >
                  TP BANK
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: "0.9em",
                    color: "whitesmoke",
                  }}
                >
                  123 12 11 1995
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: "0.9em",
                    color: "whitesmoke",
                  }}
                >
                  TRAN HOANG PHUONG LINH
                </Typography>
              </Box>
              <Box>
                <img
                  src="/QUYTONHOASEN.png"
                  alt="QR Quỹ Tôn Hoa Sen"
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <div className="text-center mt-8 pb-4">
          <div className="flex justify-center items-center space-x-2 ">
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-gray-400" style={{ fontFamily: "Goldman" }}>
              DÀNH CHÚT THỜI GIAN CHO TỤI MÌNH XIN THÔNG TIN GỬI QUÀ NHÉ!
            </span>
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        </div>
        <div className="text-center ">
          <button
            onClick={() =>
              window.open(
                "https://forms.gle/pASscwpqM5GLWQQt9",
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
            ĐIỀN THÔNG TIN Ở ĐÂY
          </button>
        </div>
      </Card>
    </Box>
  );
}
