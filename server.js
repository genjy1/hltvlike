const express = require('express')
const { HLTV } = require('hltv')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())


app.get('/api/player/:name', async (req, res) => {
    const playerName = req.params.name;
    try {
      const player = await HLTV.getPlayerByName({ name: playerName });
      const filteredPlayer = {
        name: player.name,
        image: player.image,
        ign: player.ign,
        country: player.country,
        team: player.team,
        achievements: player.achievements,
        statistics: player.statistics
      };
  
      res.json(filteredPlayer);
    } catch (error) {
      console.error(`Error fetching player ${playerName}:`, error);
      res.status(500).send(`Error fetching player ${playerName}`);
    }
  });
  app.get('/api/team/:name', async (req, res) => {
    const teamName = req.params.name;
    try {
        const team = await HLTV.getTeamByName({name:teamName});
        res.json(team)
    }catch (error) {
        console.error(`Error fetching team ${team}: `, error)
        res.status(500).send(`Error fetching team ${teamName}`);
    }
  })

  app.get('/api/teamRanking', async (req, res) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    try {
        const ranking = await HLTV.getTeamRanking({year,month, day});
        res.json(ranking)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
  })

  app.get('/api/news', async(req, res) => {
    try {
      const news = await HLTV.getNews();

      res.json(news)
    }catch(error){
      console.error(error)
      res.status(500).send(error)
    }
  })
  
  // Запуск сервера
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  
