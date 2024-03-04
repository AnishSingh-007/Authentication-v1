import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";

const MathElement = (props) => {
  // const script = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-MML-AM_HTMLorMML";
  const { elements } = props;
  const ref = useRef(null);                     
 /*  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.async = true;  */               
  const element = parse(props.elements);

  useEffect(() => {
   // window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
  }, []);   
  
  return <><div ref={ref}>{element}</div></>;               
};

export default MathElement;
