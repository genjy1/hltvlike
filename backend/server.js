const express = require('express');
const { HLTV } = require('hltv');
const cors = require('cors');
const path = require('path'); // Для раздачи статических файлов
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // Кэш на 5 минут
const port = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Универсальная функция для проверки и обновления кэша
async function getOrFetch(cacheKey, fetchFunction) {
  // Проверяем кэш
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData; // Если есть кэш, сразу возвращаем его
  }

  // Если кэша нет, загружаем данные
  const freshData = await fetchFunction();
  cache.set(cacheKey, freshData); // Сохраняем данные в кэш
  return freshData; // Возвращаем свежие данные
}


app.get('/api/player/:id/image', async (req, res) => {
  const playerId = req.params.id;

  const player = await HLTV.getPlayer({id:playerId});

  res.json({image : player.image});
})

// API: Получение игрока
app.get('/api/player/:id/', async (req, res) => {
  const playerId = req.params.id;

  const player = await HLTV.getPlayer({id:playerId});

  res.json(player);
})

app.get('/api/player/:id', async (req, res) => {
  const playerName = req.params.id;
  const cacheKey = `player-${playerName}`;

  try {
    const player = await getOrFetch(cacheKey, async () => {
      const fetchedPlayer = await HLTV.getPlayer({ id: playerName });
      return {
        name: fetchedPlayer.name,
        image: fetchedPlayer.image,
        ign: fetchedPlayer.ign,
        country: fetchedPlayer.country,
        team: fetchedPlayer.team,
        achievements: fetchedPlayer.achievements,
        statistics: fetchedPlayer.statistics,
      };
    });

    res.json(player);
  } catch (error) {
    console.error(`Error fetching player ${playerName}:`, error);
    res.status(500).send(`Error fetching player ${playerName}`);
  }
});

// API: Получение команды
app.get('/api/team/:name', async (req, res) => {
  const teamName = req.params.name;
  const cacheKey = `team-${teamName}`;

  try {
    const team = await getOrFetch(cacheKey, async () => {
      return await HLTV.getTeamByName({ name: teamName });
    });

    res.json(team);
  } catch (error) {
    console.error(`Error fetching team ${teamName}:`, error);
    res.status(500).send(`Error fetching team ${teamName}`);
  }
});

// API: Рейтинг команд
app.get('/api/teamRanking', async (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  const cacheKey = `teamRanking-${dateString}`;

  try {
    const teamRanking = await getOrFetch(cacheKey, async () => {
      return await HLTV.getTeamRanking({ date: dateString });
    });

    res.json(teamRanking);
  } catch (error) {
    console.error('Error retrieving team ranking:', error);
    res.status(500).send({ error: 'Failed to retrieve team ranking' });
  }
});

app.get('/api/playerRanking', async (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  const cacheKey = `playerRanking-${dateString}`;

  // Get pagination parameters from query (default values for page = 1 and limit = 10)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit; // Calculate the starting index for pagination

  try {
    const playerRanking = await getOrFetch(cacheKey, async () => {
      return await HLTV.getPlayerRanking({ date: dateString });
    });

    // Paginate the results based on the start index and limit
    const paginatedRanking = playerRanking.slice(startIndex, startIndex + limit);

    // Include metadata such as total count and current page
    res.json({
      players: paginatedRanking,
      totalPlayers: playerRanking.length,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error retrieving player ranking:', error);
    res.status(500).send({ error: 'Failed to retrieve player ranking' });
  }
});


// API: Новости
app.get('/api/news', async (req, res) => {
  const cacheKey = `news`;

  try {
    const news = await getOrFetch(cacheKey, async () => {
      return await HLTV.getNews();
    });

    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send({ error: 'Failed to fetch news' });
  }
});

// API: События
app.get('/api/events', async (req, res) => {
  const cacheKey = `events`;

  try {
    const events = await getOrFetch(cacheKey, async () => {
      return await HLTV.getEvents();
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send({ error: 'Failed to fetch events' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
