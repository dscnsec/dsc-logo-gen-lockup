import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { render } from "react-dom";
import WebFont from "webfontloader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import "./style.css";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

class App extends Component {
  constructor() {
    super({});
    this.state = {
      scale: 1,
      name: "School Name Below",
      checkedA: false
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Roboto:400", "Product Sans", "Product Sans:400"]
      },
      fontactive: (familyName, fvd) => {
        this.drawImage();
        this.drawImageOld();
        this.drawImageVerticalOld();
        this.drawImageVertical();
      }
    });
  }

  render() {
    return (
      <div className="main">
        <h1>DSC Lockup Generator</h1>
        <div style={hidden}>
          <img
            ref={e => {
              this.dscLogo = e;
            }}
            onLoad={() => {
              this.drawImage();
            }}
            src="dsc_icon-01.svg"
            alt={`DSC Icon`}
          />
        </div>
        <p>Start editing to see some magic happen :)</p>

        {this.renderThemeSwitch()}

        {this.renderScaleButton()}
        <TextField
          label="University"
          margin="normal"
          onChange={e => {
            this.setState(
              {
                name: e.target.value
              },
              () => {
                this.drawImage();
                this.drawImageOld();
                this.drawImageVertical();
                this.drawImageVerticalOld();
              }
            );
          }}
        />
        <br />
        <canvas
          style={hidden}
          ref={e => {
            this.logoCanvas = e;
          }}
        />

        {this.state.checkedA ? (
          <div>
            <div className="full-logo-container">
              <img
                ref={e => {
                  this.fullLogoImg = e;
                }}
                alt={`DSC ${this.state.name} Logo`}
                src={this.state.fullLogoUrl}
              />
            </div>
            <div className="full-logo-container">
              <img
                ref={e => {
                  this.fullLogoImg = e;
                }}
                alt={`DSC ${this.state.name} Logo`}
                src={this.state.fullLogoUrlVertical}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="full-logo-container">
              <img
                ref={e => {
                  this.fullLogoImg = e;
                }}
                alt={`DSC ${this.state.name} Logo`}
                src={this.state.fullLogoUrlOld}
              />
            </div>
            <div className="full-logo-container">
              <img
                ref={e => {
                  this.fullLogoImg = e;
                }}
                alt={`DSC ${this.state.name} Logo`}
                src={this.state.fullLogoUrlVerticalOld}
              />
            </div>
          </div>
        )}

        {this.state.checkedA ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              href={this.state.fullLogoUrl}
              style={{ margin: "5px" }}
              download={`DSC ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
            >
              DOWNLOAD HORIZONTAL
            </Button>
            <Button
              variant="contained"
              color="primary"
              href={this.state.fullLogoUrlVertical}
              download={`DSC ${this.state.name} Dark Y-Logo x${this.state.scale}.png`}
              style={{ margin: "5px" }}
            >
              DOWNLOAD VERTICAL
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              href={this.state.fullLogoUrlOld}
              download={`DSC ${this.state.name}Light X-Logo x${this.state.scale}.png`}
              style={{ margin: "5px" }}
            >
              DOWNLOAD HORIZONTAL
            </Button>
            <Button
              variant="contained"
              color="primary"
              href={this.state.fullLogoUrlVerticalOld}
              download={`DSC ${this.state.name}Light Y-Logo x${this.state.scale}.png`}
              style={{ margin: "5px" }}
            >
              DOWNLOAD VERTICAL
            </Button>
          </div>
        )}
        {/* <footer>
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️{" "}
          </span>{" "}
          by <a href="https://twitter.com/shanggyilim">@shanggyilim</a> •{" "}
          <a href="https://github.com/shangyilim/dsc-logo-generator">GitHub</a>
          &nbsp;• Modified also with{" "}
          <span role="img" aria-label="love">
            ❤️{" "}
          </span>
          by <a href="https://github.com/simonpham">@simonpham</a>.{" "}
          <a href="https://github.com/DSC-Ton-Duc-Thang-University/dsc-logo-generator">
            GitHub
          </a>
        </footer> */}
      </div>
    );
  }

  drawImage() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `94px "Product Sans"`;

    const canvasWidth =
      ctx.measureText("Developer Student Clubs").width +
      this.dscLogo.width +
      80;
    const canvasHeight = this.dscLogo.height + 80;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.fillStyle = "#000";
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // ctx.fillStyle = "rgba(0, 0, 0, 0.54)";
    ctx.fillStyle = "#fff";

    ctx.drawImage(this.dscLogo, 20, 0, this.dscLogo.width, this.dscLogo.height);

    ctx.fillText("Developer Student Clubs ", this.dscLogo.width + 40, 110);

    ctx.font = `400 64px "Product Sans"`;
    ctx.fillText(name, this.dscLogo.width + 45, 200);

    this.setState({
      fullLogoUrl: this.logoCanvas.toDataURL()
    });
  }

  drawImageVertical() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `94px "Product Sans"`;

    const canvasWidth =
      ctx.measureText("Developer Student Clubs").width +
      this.dscLogo.width +
      80;
    const canvasHeight = this.dscLogo.height + 150;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.fillStyle = "#000";
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // ctx.fillStyle = "rgba(0, 0, 0, 0.54)";
    ctx.fillStyle = "#fff";

    ctx.drawImage(
      this.dscLogo,
      550,
      -25,
      this.dscLogo.width,
      this.dscLogo.height
    );
    ctx.textBaseline = "bottom";
    ctx.fillText(
      "Developer Student Clubs ",
      this.dscLogo.width - 20,
      this.dscLogo.width + 50
    );

    ctx.font = `400 64px "Product Sans"`;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.fillText(name, this.dscLogo.width + 500, this.dscLogo.width + 130);

    this.setState({
      fullLogoUrlVertical: this.logoCanvas.toDataURL()
    });
  }

  drawImageOld() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `94px "Product Sans"`;

    const canvasWidth =
      ctx.measureText("Developer Student Clubs").width +
      this.dscLogo.width +
      80;
    const canvasHeight = this.dscLogo.height + 80;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(this.dscLogo, 20, 0, this.dscLogo.width, this.dscLogo.height);

    ctx.fillText("Developer Student Clubs ", this.dscLogo.width + 40, 110);

    ctx.font = `400 64px "Product Sans"`;
    ctx.fillText(name, this.dscLogo.width + 45, 200);

    this.setState({
      fullLogoUrlOld: this.logoCanvas.toDataURL()
    });
  }

  drawImageVerticalOld() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `94px "Product Sans"`;

    const canvasWidth =
      ctx.measureText("Developer Student Clubs").width +
      this.dscLogo.width +
      80;
    const canvasHeight = this.dscLogo.height + 150;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(
      this.dscLogo,
      550,
      -25,
      this.dscLogo.width,
      this.dscLogo.height
    );
    ctx.textBaseline = "bottom";
    ctx.fillText(
      "Developer Student Clubs ",
      this.dscLogo.width - 20,
      this.dscLogo.width + 50
    );

    ctx.font = `400 64px "Product Sans"`;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.fillText(name, this.dscLogo.width + 500, this.dscLogo.width + 130);

    this.setState({
      fullLogoUrlVerticalOld: this.logoCanvas.toDataURL()
    });
  }

  renderThemeSwitch() {
    const handleChange = name => event => {
      this.setState({ ...this.state, [name]: event.target.checked });
    };
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={handleChange("checkedA")}
              value="checkedA"
              color="primary"
            />
          }
          label="Dark"
        />
      </FormGroup>
    );
  }

  renderScaleButton() {
    return (
      <div className="scale-button">
        <Fab
          color="primary"
          size="small"
          aria-label="add"
          className={useStyles.fab}
          onClick={() =>
            this.setState(
              {
                scale:
                  this.state.scale > 1 ? this.state.scale - 1 : this.state.scale
              },
              () => {
                this.drawImage();
                this.drawImageOld();
                this.drawImageVerticalOld();
                this.drawImageVertical();
              }
            )
          }
        >
          <ZoomOutIcon />
        </Fab>

        <span>Scale</span>

        <Fab
          color="primary"
          size="small"
          aria-label="add"
          className={useStyles.fab}
          onClick={() =>
            this.setState(
              {
                scale:
                  this.state.scale < 5 ? this.state.scale + 1 : this.state.scale
              },
              () => {
                this.drawImage();
                this.drawImageOld();
                this.drawImageVerticalOld();
                this.drawImageVertical();
              }
            )
          }
        >
          <ZoomInIcon />
        </Fab>
      </div>
    );
  }
}

const hidden = {
  display: "none"
};

render(<App />, document.getElementById("root"));
