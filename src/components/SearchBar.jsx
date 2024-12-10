import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  IconButton,
  Autocomplete,
  TextField,
  Grid2,
  Box,
} from "@mui/material";
import { Search, SearchOutlined } from "@mui/icons-material";
import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import { GOOGLE_AC_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";

// const options = ["HTML", "CSS", "Javascript", "TypeScript", "React"];

const suggest = async () => {
  return axios({
    // A YT undocumented API for auto suggest search queries
    url: GOOGLE_AC_URL,
    adapter: jsonpAdapter,
    params: {
      client: "youtube",
      hl: "en",
      ds: "yt",
      q: "iphone",
    },
  }).then((res) => {
    console.log("jsonp results >> ", res.data[1]);
    if (res.status !== 200) {
      throw Error("Suggest API not 200!");
    }
  });
};

// suggest();

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const searchCache = useSelector((store) => store.search.data);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      navigate(`/search/${inputValue}`);
      setInputValue("");
      setValue(null);
    }
  };

  console.log(value);
  console.log(inputValue);
  console.log(options);
  console.log(JSON.stringify(searchCache));

  const getSearchSuggestion = async () => {
    if (inputValue) {
      axios({
        url: GOOGLE_AC_URL,
        adapter: jsonpAdapter,
        params: {
          client: "youtube",
          hl: "en",
          ds: "yt",
          q: inputValue,
        },
      }).then((res) => {
        setOptions(res.data[1].map((item) => item[0]));
        // update cache with new search results
        dispatch(
          cacheResults({
            [inputValue]: res.data[1].map((item) => item[0]),
          })
        );
        console.log("jsonp results >> ", res.data[1]);
        if (res.status !== 200) {
          throw Error("Suggest API not 200!");
        }
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[inputValue]) {
        setOptions(searchCache[inputValue]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        borderRadius: 20,
        border: "1px solid #303030",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
        backgroundColor: "#121212",
        height: "42px",
      }}
    >
      {/* <input
        className="search-bar"
        placeholder="search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      /> */}
      <Autocomplete
        className="search-bar"
        getOptionLabel={(option) => (typeof option === "string" ? option : "")}
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search" sx={{ color: "white" }} />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            <Grid2 container sx={{ alignItems: "center" }}>
              <Grid2 item sx={{ display: "flex", width: 44 }}>
                <SearchOutlined sx={{ color: "text.secondary" }} />
              </Grid2>
              <Grid2
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Box component="span" sx={{ fontWeight: "regular" }}>
                  {option}
                </Box>
              </Grid2>
            </Grid2>
          </li>
        )}
        sx={{
          borderRadius: "10px",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "white",
            },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            height: "42px",
          },
        }}
        popupIcon={null}
        value={value}
        noOptionsText="No results"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        freeSolo
      />
      <IconButton
        type="submit"
        sx={{
          border: "1px solid #303030",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
          px: "14px",
          color: "red",
          backgroundColor: "#212121",
          "&:hover": {
            backgroundColor: "#414141",
          },
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
