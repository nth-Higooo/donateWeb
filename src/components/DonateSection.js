// src/components/DonationSection.tsx
import { Box, Card, Typography, Grid } from "@mui/material";

export default function DonationSection() {
  return (
    <Box sx={{ py: 6, px: 0 }} className="container mx-auto px-4">
      <Card
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: "20px",
          backgroundColor: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(236,72,153,0.3)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 6,
            fontSize: { xs: "20px", sm: "28px" },
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
                  SUPPER FEST
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
                  QUỸ TÔN HOA SEN
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
      </Card>
    </Box>
  );
}
