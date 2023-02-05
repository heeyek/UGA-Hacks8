import React, { useState , useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';


const lightTheme = createTheme();
var darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
function App() {

    


    /* data is the actual variable */
    /* setData is the function we can use to manipulate the state of the data variable*/
    /* initial state is useState([{}]) but once we fetch the backend the state of the data variable will change to the data we get from backend */
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [theme, setTheme] = useState(lightTheme)

    const [searchValue, setSearchValue] = useState("");

    const searchClicked = (event) => {
        setLoading(true);
        console.log(searchValue);
        /* 1. Make API Request */
        fetch(`/pics?country=${searchValue}`).then(
            res => res.json()
        )
        .then(
            data => {
                setData(data)
                console.log(data)
                setLoading(false);
            }
        )
        
    }

    return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
            <Switch defaultChecked onChange={() => setTheme(theme === lightTheme ? darkTheme : lightTheme)} color = "default" />

            </Toolbar>
        </AppBar>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex'
          }}
        >
        <img alt="world2" className='img1' src="worldreal.png" width="100" height="100" />


          <Container maxWidth="sm">

            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            {/* <TextField id="outlined-basic" label="Country" variant="outlined" value={searchValue} onChange={(event)=> setSearchValue(event.target.value)}/> */}
            <TextField id="outlined-basic" label="Country" fullWidth variant="outlined" value={searchValue} onChange={(event)=> setSearchValue(event.target.value)}/>
            { loading ? <LoadingButton variant="contained">Loading...</LoadingButton>: <Button variant="contained" onClick={searchClicked}>Search</Button>}
            {data && <p>{data.travelAdvise}</p>}
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 550 }}>
            {<p style={{"whiteSpace": "pre-line"}}>{data && data.facts}</p>}
            {/* <p>{JSON.stringify(data)}</p> */}
      
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            </Paper>
            
            {/* <Button variant="text" onClick={searchClicked}>Search</Button> */}
            {/*<p>{JSON.stringify(data)}</p>*/}
            {/* If data is true then show image. */}
            {data && <img src={data.pictureUrl}/>}


          </Container>

        </Box>
      </ThemeProvider>
    )

    


    

   
}

export default App
