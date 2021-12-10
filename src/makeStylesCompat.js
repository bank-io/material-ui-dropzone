import React from "react";
//WARNING: tss-react require TypeScript v4.4 or newer. If you can't update use:
//import { createMakeAndWithStyles } from "tss-react/compat";
import { createMakeAndWithStyles } from "tss-react";
import { useTheme } from "@mui/material/styles";

const { makeStyles: tssMakeStyles, withStyles: tssWithStyles } = createMakeAndWithStyles({
    useTheme,
    /*
    OR, if you have extended the default mui theme adding your own custom properties: 
    Let's assume the myTheme object that you provide to the <ThemeProvider /> is of 
    type MyTheme then you'll write:
    */
    //"useTheme": useTheme as (()=> MyTheme)
});

export const makeStyles = styles => {
    const useStyles = tssMakeStyles()(styles);

    return (props) => {
        const {classes} = useStyles(props);

        return classes;
    }
}

export const withStyles = (styles = null, options = {}) => (ComponentToWrap) => {
    const useStyles = styles ? makeStyles(styles) : null;
  
    return React.forwardRef((props, ref) => {
        const classes = useStyles ? useStyles(props) : null;

        const theme = options.withTheme ? useTheme() : undefined;
  
        return (
          <ComponentToWrap ref={ref} classes={classes} theme={theme} {...props} />
        );
      })
  };