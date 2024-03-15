import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

import styled from "@emotion/styled";
import { isNameValid, getLocations, getRegisteredUsers } from "./mock-api/apis";
import Header from "./components/Header";
import Register from "./components/Register";
import { TextField, MenuItem, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import { useDebouncedCallback } from "use-debounce";

const PageContainer = styled.div`
  background-color: #f1f5f9;
  height: 100vh;
`;

const Body = styled.div`
  padding: 20px;
`;

const InputContainer = styled.div`
  width: 80%;
  max-width: 700px;
  margin: 40px auto;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top: 20px;
  justify-content: end;
`;

function App() {
  // State variables for Name, Location.
  const [name, setName] = useState("");
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [users, setUsers] = useState([]);
  const [processingState, setProcessingState] = useState(true);

  // State variable to validate name and location
  const [nameError, setNameError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    getLocations().then((locations) => setLocations(locations));
    getRegisteredUsers().then((users) => setUsers(users));
  }, []);

  // Event handler for name changes
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(null);
    validateName(e.target.value);
  };

  // Event handler for location changes
  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
    setLocationError(null);
  };

  // Function to validate name
  const validateName = (name) => {
    isNameValid(name).then((isValid) => {
      setNameError(isValid ? null : "Name is already taken");
    });
  };

  // Function to validate location
  const validateLocation = (location) => {
    if (location === "USA") {
      return "United States";
    }
    return location;
  };

  // Event handler for Clear Button
  const handleClear = () => {
    setName("");
    setCurrentLocation("");
    setNameError(null);
    setLocationError(null);
    setUsers([]);
  };

  // Event handler for Add Button
  const handleAdd = () => {
    const userExists = users.some((user) => user.name === name && user.location === currentLocation);
    if (userExists) {
      setNameError("This user is already registered");
      return;
    }

    setUsers([...users, { name, location: currentLocation }]);
    setName("");
    setCurrentLocation("");
  };

  return (
      <div className="App">
        <PageContainer>
          <Header />

          <Body>
            <InputContainer>
              <TextField
                  id="input_name"
                  label="Name"
                  fullWidth={true}
                  margin="normal"
                  error={!!nameError}
                  helperText={nameError}
                  value={name}
                  onChange={handleNameChange}
              />

              <TextField
                  id="input_location"
                  select
                  label="Location"
                  fullWidth={true}
                  margin="normal"
                  value={currentLocation}
                  onChange={handleLocationChange}
              >
                {locations.map((loc, index) => (
                    <MenuItem key={index} value={validateLocation(loc)}>
                      {loc}
                    </MenuItem>
                ))}
              </TextField>

              <ButtonsContainer>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleAdd}
                >
                  Add
                </Button>
              </ButtonsContainer>

              <Register users={users} />
            </InputContainer>
          </Body>
        </PageContainer>
      </div>
  );
}

export default App;