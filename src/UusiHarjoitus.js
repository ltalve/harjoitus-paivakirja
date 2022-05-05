import React from "react";
import { Button, Box, Typography, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { fi } from "date-fns/locale";

function UusiHarjoitus(props) {
  const history = useHistory();

  const [laji, setLaji] = useState();
  const [pvmaika_aloitus, setPvmAika_aloitus] = useState();
  const [pvmaika_lopetus, setPvmAika_lopetus] = useState();

  const [virheilmoitus, setVirheIlmoitus] = useState({});

  const kasitteleLomake = (e) => {
    e.preventDefault();
    let uusiHarjoitus = {
      laji: laji,
      alku: pvmaika_aloitus,
      loppu: pvmaika_lopetus,
    };

    let virheet = {};

    if (!uusiHarjoitus.laji) {
      virheet = { ...virheet, laji: "Laji on pakollinen tieto." };
    }

    if (uusiHarjoitus.alku === undefined) {
      virheet = { ...virheet, alku: "Syötä aloitusajankohta." };
    }

    if (uusiHarjoitus.alku > uusiHarjoitus.loppu) {
      virheet = {
        ...virheet,
        alku: "Aloitusajankohdan tulee olla ennen lopetusajankohtaa.",
      };
    }

    if (uusiHarjoitus.loppu === undefined) {
      virheet = { ...virheet, loppu: "Syötä lopetusajankohta." };
    }

    if (Object.entries(virheet).length > 0) {
      setVirheIlmoitus({ ...virheet });
    } else {
      setVirheIlmoitus({});
      props.lisaaHarjoitus(uusiHarjoitus);
      history.push("/");
    }
  };

  const syotonTarkistus = (e) => {
    e.preventDefault();
    setLaji(e.target.value);
  };

  const palaaEtusivulle = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Box width="30%" margin="auto" mt="20px" p="40px">
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fi}>
        <form onSubmit={kasitteleLomake}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h4" style={{ marginBottom: 30 }}>
              Uusi harjoitus
            </Typography>

            <TextField
              name="laji"
              label="Harjoituksen laji*"
              variant="outlined"
              fullWidth
              style={{ marginBottom: 30 }}
              error={Boolean(virheilmoitus.laji)}
              helperText={virheilmoitus.laji}
              onChange={syotonTarkistus}
            />

            <DateTimePicker
              name="alku"
              label="Harjoituksen aloitusajankohta*"
              inputVariant="outlined"
              style={{ marginBottom: 30 }}
              fullWidth={true}
              cancelLabel="Peruuta"
              format="d.M.y HH:mm"
              ampm={false}
              value={pvmaika_aloitus}
              onChange={setPvmAika_aloitus}
              disableFuture={true}
              error={Boolean(virheilmoitus.alku)}
              helperText={virheilmoitus.alku}
            />

            <DateTimePicker
              name="loppu"
              label="Harjoituksen lopetusajankohta*"
              inputVariant="outlined"
              style={{ marginBottom: 30 }}
              fullWidth={true}
              cancelLabel="Peruuta"
              format="d.M.y HH:mm"
              ampm={false}
              value={pvmaika_lopetus}
              onChange={setPvmAika_lopetus}
              disableFuture={true}
              error={Boolean(virheilmoitus.loppu)}
              helperText={virheilmoitus.loppu}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={true}
              size="large"
              style={{ marginBottom: 20 }}
            >
              Lisää harjoitus
            </Button>

            <Button
              variant="text"
              disableElevation
              onClick={palaaEtusivulle}
              size="small"
              startIcon={<ArrowBackIos />}
            >
              Palaa etusivulle
            </Button>
          </Box>
        </form>
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default UusiHarjoitus;
