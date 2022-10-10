interface ButtonProps {
  variant: string;
  link: string;
  logo?: JSX.Element;
  buttonName: string;
}

export function Button(props: ButtonProps) {
  return (
    <a href={props.link} target="_blank" className={`btn ${props.variant}`}>
      {props.logo}
      {props.buttonName}
    </a>
  );
}
