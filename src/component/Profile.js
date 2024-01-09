import { useContext } from "react"
import { BookDataContext, StorageContext } from "./Context"
import CardBlock from "./CardBlock"

export default function Profile() {
  const data = useContext(BookDataContext)
  console.log("''''", data)

  return (
    <div>
      <h3>AC.</h3>
      <div style={{width: "60%", margin: "auto", height: "400px", overflow: "auto"}}>
        {
          data.map(book => (
            <div style={{margin: "40px 10px"}}>
              <CardBlock book={book} />
            </div>
          )
          )
        }
      </div>

    </div>
  )
}
