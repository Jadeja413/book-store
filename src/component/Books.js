import React, { useEffect } from "react";

export default function Books() {

  useEffect(() => {
    fetch('https://freetestapi.com/api/v1/books')
      .then(res => res.json())
      .then(json => console.log(json))
  }, []);

  return (
    <div>

    </div>
  )

}
