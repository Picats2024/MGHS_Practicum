import React, { useEffect } from 'react';
import { useState } from 'react';
import { getTeamById } from '../utils/apiCalls';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DeleteTeam from '../components/modals/DeleteTeam';

const TeamDetailsPage = () => {

    // the team data currenly being accessed
    const [team, setTeam] = useState({}); // the team itself
    const [members, setMembers] = useState([]) // the team's members
    const [tasks, setTasks] = useState([]) // the team's tasks, pending or otherwise

    let params = useParams();


    useEffect(() => {
      // simply call the api and get a specific team by the params used to access this page
      async function FetchTeamandMembers() {

        // get team from api using the params in the page URL
        const team = await getTeamById(params["id"])

        // nested function to access the team's members
        // TODO: consider that it may be redundant to have this
        async function FetchallMemebers(){
          const URL = "https://mghs-backend.onrender.com/team/members/" + params["id"]

          let response = await fetch(URL, {
            method: 'GET',
            credentials: "omit", 
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const data = await response.json()
          return data.members
        
        }

        // set members to the array accesssed from api
        setMembers(await FetchallMemebers())
        // set team to result of api call
        setTeam(team)
        
      }

    FetchTeamandMembers()

    }, [])

    
  return (
    <main class="team-details details">

      <h3>
        {team.name}
      </h3>

      <p>
        {team.description}
      </p>
      {/*insert something which lists the team members below later*/}



      <table>
        <thead>
          <tr>
            <td>
              Number
            </td>

            <td>
              Name
            </td>

            <td>
              Rank
            </td>

          </tr>
        </thead>

        <tbody>
          {members.map((member, idx) => {return(
            
            <tr key={idx}>
              <td>{idx}</td>

              <td><Link to={"/profile/" + member.public_id}>{member.name}</Link></td>

              <td>{member.rank}</td>

            </tr>
          )})}
        </tbody>
      </table>

      <h2>Danger Zone</h2>

      <footer class="danger-zone">


          <section class="danger-zone-entry">


            <section class="danger-zone-desc">
              <strong>
                Delete Team
              </strong>

              <p>
                Purges current team from the database. It is advisable not to do so. 
              </p>
            </section>

            <button>
              Delete Team
            </button>
          </section>


      </footer>

      <DeleteTeam team_id={params["id"]}></DeleteTeam>

    </main>
  );
};

export default TeamDetailsPage;
