import React from 'react';

// Dá pra ao invés de props, desestruturar e fazer {title}
// {children} é todo o conteúdo da tag
export default function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>
      {props.children}
    </header>
  );
}