import { Box, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from "@mui/material/colors"

const CreateWPButton = () => {
    return (
        <Box padding="10px" position="fixed" bottom="10px" width="70vw">
            <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{
                    textTransform: "capitalize",
                    fontSize: "20px",
                    borderRadius: "15px",
                    bgcolor: grey['900'],
                    '&:hover':{
                        bgcolor: grey['600']
                    }
                }}                
            >
                Create workout plan
            </Button>
        </Box>
    )
}

export default CreateWPButton