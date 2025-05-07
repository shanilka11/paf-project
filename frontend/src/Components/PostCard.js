import { Avatar, Box, Card, CardHeader, Grid, IconButton, CardMedia, CardActions } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { red } from "@mui/material/colors"
import goku from "../img/goku.png"

const PostCard = () => {
    return (
        <Box border width="70vw" height="75vh" margin="80px 0px 75px 0px">
            <Grid container>
                <Grid item xs={12}>
                    <Card sx={{
                        width: "90%",
                        margin: "0 auto"
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            component="img"
                            height="400"
                            image={goku}
                            alt="Paella dish"
                        />

                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>

                            <IconButton aria-label="share with others">
                                <SendIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </Box>
    )
}

export default PostCard