import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Card, CardHeader, CardContent, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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
  error: {
    color: red,
  },
});

const LoginForm = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Fieryweb Signup" />
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
              <Typography variant="caption" className={classes.error}>
                {errors.username.message || "Please enter a valid username."}
              </Typography>
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
            {errors.password && (
              <Typography variant="caption" className={classes.error}>
                {errors.password.message}
              </Typography>
            )}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
