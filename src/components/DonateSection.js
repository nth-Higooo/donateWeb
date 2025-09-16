// src/components/DonationSection.tsx
import { Box, Card, Typography, Divider, Grid } from "@mui/material";

export default function DonationSection() {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Card
        sx={{
          width: { xs: "95%", sm: "90%" },
          maxWidth: "1200px",
          margin: "auto",
          padding: { xs: 3, sm: 5 },
          borderRadius: "15px",
          backgroundColor: "rgba(0,0,0,0.6)",
          boxShadow: 3,
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

        <Grid container spacing={6}>
          {/* Quỹ 1 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Thông tin */}
              <Box sx={{ flex: 1 }}>
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
                    fontSize: { xs: "0.8em", sm: "1em" },

                    color: "whitesmoke",
                  }}
                >
                  VIETCOMBANK THANH DA
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: { xs: "0.8em", sm: "1em" },

                    color: "whitesmoke",
                  }}
                >
                  053 100 258 3237
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: { xs: "0.8em", sm: "1em" },

                    color: "whitesmoke",
                  }}
                >
                  TRAN HOANG PHUONG LINH
                </Typography>
              </Box>
              {/* QR Code */}
              <Box sx={{ flexShrink: 0, textAlign: "center" }}>
                <img
                  src="/QRcode.svg"
                  alt="QR Quỹ "
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Quỹ 2 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Thông tin */}
              <Box sx={{ flex: 1 }}>
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
                    fontSize: { xs: "0.8em", sm: "1em" },

                    color: "whitesmoke",
                  }}
                >
                  TP BANK
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: { xs: "0.8em", sm: "1em" },

                    color: "whitesmoke",
                  }}
                >
                  123 12 11 1995
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Goldman",
                    fontSize: { xs: "0.8em", sm: "1em" },
                    color: "whitesmoke",
                  }}
                >
                  TRAN HOANG PHUONG LINH
                </Typography>
              </Box>

              {/* QR Code */}
              <Box sx={{ flexShrink: 0, textAlign: "center" }}>
                <img
                  src="/QUYTONHOASEN.png"
                  alt="QR Quỹ Tôn Hoa Sen"
                  style={{
                    width: "150px",
                    height: "150px",
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
