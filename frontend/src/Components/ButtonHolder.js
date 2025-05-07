import { Box, Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

const ButtonHolder = () => {

    const buttonStyle = {
        borderRadius: "20px",
        textTransform: "capitalize",
        color: grey['700'],
        borderColor: grey['700'],
        '&:hover': {
            color: grey['900'],
            borderColor: grey['900']
        }
    }
    return (
        <Box padding="5px" borderBottom={1} borderColor="divider" position="fixed" top="30px" width="70vw">
            <Grid container flexDirection="row" spacing={2}>
                <Grid item>
                    <Button variant="outlined"
                        sx={buttonStyle}
                    >
                        Current
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" sx={buttonStyle}>
                        Completed
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ButtonHolder;