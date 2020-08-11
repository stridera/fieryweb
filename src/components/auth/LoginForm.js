import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/login";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 450,
    height: "auto",
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    margin: "auto",
  },
  card: {
    padding: 20,
    overflow: "auto",
  },
  cardHeader: {
    textAlign: "center",
    paddingBottom: 0,
  },
  btnDiv: {
    textAlign: "center",
  },
  btn: {
    marginTop: 21,
  },
  smallLink: {
    fontSize: 12,
  },
});

const LoginForm = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const auth = useSelector((state) => state.auth);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(login(data.username, data.password));
  };
  const [open, setOpen] = React.useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    auth.error && setLoginError(auth.error);
    setOpen(!!auth.error);
  }, [auth]);

  return (
    <div className={classes.root}>
      {loginError && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          variant="error"
          className={classes.margin}
          message={loginError}
          onClose={() => {
            setOpen(false);
          }}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      )}
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Fieryweb Login" />
        <CardContent>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({
                required: true,
                minLength: { value: 3, message: "Username should be at least 3 characters." },
              })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
            />
            {errors.username && (
              <Typography variant="caption">{errors.username.message || "Please enter a valid username."}</Typography>
            )}
            <TextField
              inputRef={register({
                required: "Please enter a valid username.",
                minLength: { value: 8, message: "Password must be at least 8 characters." },
              })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && <Typography variant="caption">{errors.password.message}</Typography>}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className={classes.smallLink} to="/forgot_password" href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link className={classes.smallLink} to="/signup" href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
