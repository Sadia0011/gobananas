import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination, Box, Typography } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const filteredData = data.filter(item =>item.title.toLowerCase().includes(search.toLowerCase()));
  const paginatedData = filteredData.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <Container >
      <Box display="flex" justifyContent="center" mt={2}>
      <Typography variant="h4" component="h1" gutterBottom>
      GoBananas Assignment
      </Typography>
      </Box>
      <TextField 
        label="Search" 
        variant="outlined" 
        placeholder='Search based on Title'
        fullWidth 
        margin="normal" 
        onChange={(e) => setSearch(e.target.value)}
      />

      <Box my={5}>
      <TableContainer component={Paper}>
      <Box  display="flex" justifyContent="center" mt={2}>
      <Typography variant="h5" component="h2" gutterBottom>
          Posts
        </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination 
          count={Math.ceil(filteredData.length / postsPerPage)} 
          page={page} 
          onChange={handleChangePage} 
          variant="outlined" 
          shape="rounded" 
        />
      </Box>
      </Box>
    </Container>
  );
}

export default App;
