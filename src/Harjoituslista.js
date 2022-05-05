import { Box, Typography } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { format } from "date-fns";

function Harjoituslista(props) {
  if (!props.harjoituslista || !props.harjoituslista.length) return null;

  props.harjoituslista.sort((a, b) => b.loppu - a.loppu);

  return (
    <Box width="100%" margin="auto" mt="40px" p="0px">
      <Typography variant="h6">Tehdyt harjoitukset:</Typography>

      <List>
        {props.harjoituslista.map((harjoitus, idx) => {
          return (
            <ListItem key={idx}>
              <ListItemText
                primary={harjoitus.laji}
                secondary={
                  "Alku: " +
                  format(harjoitus.alku, "d.M.y HH:mm") +
                  " Loppu: " +
                  format(harjoitus.loppu, "d.M.y HH:mm")
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Harjoituslista;
