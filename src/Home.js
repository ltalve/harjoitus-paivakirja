import Harjoituslista from "./Harjoituslista";
import { Typography } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { useHistory } from "react-router-dom";
import { differenceInMinutes } from "date-fns";
import { differenceInDays } from "date-fns";

function Home(props) {
  const history = useHistory();

  const siirryUuteenHarjoitukseen = (e) => {
    e.preventDefault();
    history.push("/uusiHarjoitus");
  };

  const laskeHarjoituksenKestoMinuuteissa = (harjoitus) => {
    const kesto = differenceInMinutes(harjoitus.loppu, harjoitus.alku);
    return kesto;
  };

  let tunnit = 0;
  let minuutit = 0;
  let tunnit7vrk = 0;
  let minuutit7vrk = 0;

  if (props.harjoituslista && props.harjoituslista.length) {
    let yhteensaMin = props.harjoituslista.reduce(
      (yht, harjoitus) => yht + laskeHarjoituksenKestoMinuuteissa(harjoitus),
      0
    );
    tunnit = (yhteensaMin / 60).toFixed(0);
    minuutit = yhteensaMin % 60;
  }

  const harjoituslista7vrk = props.harjoituslista.filter(
    (harjoitus) => differenceInDays(new Date(), harjoitus.loppu) <= 7
  );

  if (harjoituslista7vrk && harjoituslista7vrk.length) {
    let yhteensaMin = harjoituslista7vrk.reduce(
      (yht, harjoitus) => yht + laskeHarjoituksenKestoMinuuteissa(harjoitus),
      0
    );
    tunnit7vrk = (yhteensaMin / 60).toFixed(0);
    minuutit7vrk = yhteensaMin % 60;
  }

  return (
    <div>
      <Box width="50%" margin="auto" mt="20px" p="40px">
        <Typography variant="h3" style={{ marginBottom: 20 }}>
          Harjoituspäiväkirja
        </Typography>
        <br />
        <Typography variant="h6" style={{ marginBottom: 20 }}>
          Harjoitteluaika yhteensä:
          <br /> {tunnit} tuntia ja {minuutit} minuuttia.
        </Typography>

        <Typography variant="h6" style={{ marginBottom: 40 }}>
          Harjoittelu viimeisen viikon aikana:
          <br /> {tunnit7vrk} tuntia ja {minuutit7vrk} minuuttia.
        </Typography>

        <Button
          variant="contained"
          disableElevation
          color="primary"
          endIcon={<DirectionsRunIcon />}
          onClick={siirryUuteenHarjoitukseen}
          style={{ marginBottom: 10 }}
        >
          Lisää uusi harjoitus
        </Button>

        <Harjoituslista harjoituslista={props.harjoituslista} />
      </Box>
    </div>
  );
}

export default Home;
