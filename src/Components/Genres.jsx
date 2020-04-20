import React from "react";
import axios from "axios";
import config from "../config.json";
import ErrorHandler from "./ErrorHandler";

class Genres extends React.Component {
  state = {
    genres: [],
    username: this.props.auth.user.username,

    num: 1,
    genre1: "",
    g1_avatar: "",
    genre2: "",
    g2_avatar: "",
    genre3: "",
    g3_avatar: "",

    error: null,
    success: null,
  };

  fetchGenres = async () => {
    try {
      const response = await axios.get(`${config.api.invokeURL}/genres/`);
      const genres = response.data;

      this.setState({ genres: genres });
    } catch (error) {
      const message =
        "We have not being able to load the genre selection, please go back to your profile and try again";

      this.setState({
        error: { message },
      });
    }
  };

  selectGenre = (event) => {
    let { num } = this.state;
    const genre = event.target.name;
    const avatar = event.target.src;

    if (num < 4) {
      console.log(num);
      if (num === 1) {
        this.setState({ genre1: genre, g1_avatar: avatar, num: 2 });
      }

      if (num === 2) {
        this.setState({ genre2: genre, g2_avatar: avatar, num: 3 });
      }

      if (num === 3) {
        console.log(num, "num in this");
        this.setState({ genre3: genre, g3_avatar: avatar, num: 4 });
      }
    }
  };

  saveGenres = () => {
    const { genre1, genre2, genre3 } = this.state;
    if (genre1 === "" || genre2 === "" || genre3 === "") {
    } else {
      this.updateProfile();
      console.log(this.state.genre1, this.state.genre2, this.state.genre3);
      this.setState({
        num: 1,
        genre1: "",
        g1_avatar: "",
        genre2: "",
        g2_avatar: "",
        genre3: "",
        g3_avatar: "",
      });
    }
  };

  updateProfile = async () => {
    const {
      username,
      genre1,
      g1_avatar,
      genre2,
      g2_avatar,
      genre3,
      g3_avatar,
    } = this.state;

    try {
      const params = {
        username: username,
        genre1: genre1,
        g1_avatar: g1_avatar,
        genre2: genre2,
        g2_avatar: g2_avatar,
        genre3: genre3,
        g3_avatar: g3_avatar,
      };

      console.log(params, "params");

      await axios
        .patch(`${config.api.invokeURL}/profile/${username}`, params)
        .then((res) => {
          const status = res.status;
          const message = "Changes saved";
          this.setState({
            success: { message, status },
          });
        });
    } catch (error) {
      const message =
        "We have not being able to update your favourite genre's, please go back to your profile and try again";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    this.fetchGenres();
  }

  render() {
    return (
      <>
        <div>
          <h1>Pick Your Favourites</h1>
          <ErrorHandler
            apierrors={this.state.error}
            success={this.state.success}
          />

          <main>
            <div className={"genre-selection"} disabled={this.state.i > 2}>
              {this.state.genres.map(({ genre, g_avatar }, i) => {
                return (
                  <button
                    //disabled={this.num === 4}
                    onClick={this.selectGenre}
                    key={i}
                  >
                    {genre}

                    <img name={genre} alt="genre-avatar" src={g_avatar} />
                  </button>
                );
              })}

              <button onClick={this.saveGenres}>Save</button>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Genres;
