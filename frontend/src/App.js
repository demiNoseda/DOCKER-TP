import React, { useState } from "react";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import theme from "./styles/theme";
import Swal from "sweetalert2";
import "./styles/App.css";

function App() {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/random-insert");
      setData(response.data);

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "¡Dato generado con éxito!",
          text: "",
          timer: 1200,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que hubo un error al generar el dato.",
      });
      console.error(err);
    }
  };

  const insertData = async () => {
    if (input === "") {
      Swal.fire({
        title: "Dato vacío",
        text: "Por favor, ingrese algún dato.",
        icon: "info",
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/insert", {
        data: input,
      });
      Swal.fire({
        icon: "success",
        title: "¡Dato insertado con éxito!",
        text: "",
        timer: 1200,
      });
      setData(response.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que hubo un error al insertar el dato.",
      });
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="background">
        <Container maxWidth="sm">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                textAlign="center"
                sx={{
                  background: "linear-gradient(to left, #6200ea, #FF3EA5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                  textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                Docker TP
              </Typography>
              <Card>
                <CardContent>
                  <Box my={4}>
                    <Typography
                      variant="h2"
                      component="h2"
                      gutterBottom
                      textAlign="center"
                    >
                      Ingrese algún dato
                    </Typography>
                    <TextField
                      label="Dato"
                      variant="outlined"
                      fullWidth
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      margin="normal"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={insertData}
                      startIcon={<InsertDriveFileIcon />}
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Enviar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={fetchData}
                      startIcon={<ShuffleIcon />}
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Generar dato aleatorio
                    </Button>
                  </Box>
                  <Box my={4}>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Resultado
                    </Typography>
                    <pre>{data ? JSON.stringify(data, null, 2) : "-"}</pre>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
