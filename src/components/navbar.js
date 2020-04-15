import React from 'react';
import { Link } from 'gatsby'

const styles = {
  ul: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  li: {listStyle: 'none', paddingLeft: 10},
}

const Navbar = ({ continents }) => {

  return (
    <div>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to={`/countries/`}>Countries</Link>
        </li>
        {
          continents.map((continent, i) => {
            return (
              <li 
                style={styles.li}
                key={i}>
                <Link to={`/${continent.name.toLowerCase()}/`}>{continent.name}</Link>
              </li>
            )
          })
        }

      </ul>
    </div>
  )
}

export default Navbar