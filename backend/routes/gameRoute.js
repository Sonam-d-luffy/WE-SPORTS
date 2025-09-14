import express from 'express'
import uploads from '../utils/multer.js'
import Tournament from '../schema/tournamentSchema.js'
import mongoose from 'mongoose';

const router = express.Router()

router.post('/gamesUpload', uploads.single('image'), async (req, res) => {
  try {
    const { gameName, description, live } = req.body;

    if (!gameName || !description || !live) {
      return res.status(400).json({ message: 'Fill all the fields' });
    }

    const tournament = await Tournament.findOne({ gameName });
    if (tournament) {
      return res.status(400).json({ message: 'This game is already uploaded' });
    }

    const newTournament = new Tournament({
      gameName,
      image: req.file ? req.file.path.replace(/\\/g, "/") : null,
      description,
      live ,
      games: []
    });

    await newTournament.save();
    return res.status(200).json({ message: 'Tournament saved', tournaments: newTournament });
  } catch (error) {
    console.error("Upload error:", error);   // 👈 print actual error
    return res.status(500).json({ message: error.message || 'Server error' });
  }
});

router.get('/allTournaments' , async(req , res) => {
  try {
    const tournaments = await Tournament.find()
    if(!tournaments){
      return res.status(404).json({message: 'Sorry , you have not uploaded any tournament yet'})
    }
    return res.status(200).json({alltournaments: tournaments})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : 'Server Error'})
  }
})

// PUT /api/tournaments/:id/live
router.put("/:id/live", async (req, res) => {
  try {
    const { live } = req.body; // expect "yes" or "no"

    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { live },
      { new: true }
    );

    if (!updatedTournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json({ message: "Live status updated", tournament: updatedTournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id/delete' , async(req , res) => {
  try {
    const {id} = req.params
    const tournament = await Tournament.findById(id)
      if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // delete
    await Tournament.findByIdAndDelete(id);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
    
  }
})
router.put("/:tournamentId/:gameId/live", async (req, res) => {
  try {
    const { gameLive } = req.body; // expect "yes" or "no"
    const { tournamentId, gameId } = req.params;

    // Find the tournament
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Find the specific game in the tournament's games array
    const game = tournament.games.id(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Update the game's live status
    game.gameLive = gameLive;

    // Save the tournament with the updated game
    await tournament.save();

    res.json({ message: "Live status updated", game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:tournamentId/:gameId/deletegame', async (req, res) => {
  try {
    const { tournamentId, gameId } = req.params;

    // Find tournament
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Find game inside games array
    const game = tournament.games.id(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Remove game
      tournament.games.pull({ _id: gameId });
    await tournament.save();

    res.json({ message: 'Game deleted successfully', tournament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.post("/:tournamentId/games",uploads.single('image') ,async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const {
      name,
      gameDescription,
      eligibility,
      Time,
      date,
      
      price,
      gameLive
    } = req.body;
   if(!name || !gameDescription || !eligibility || !Time || !date  || !price || !gameLive){
    return res.status(400).json({message : 'Fill all th required fields'})
   }
    // find tournament
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // add game
    const newGame = {
      name,
      gameDescription,
      eligibility,
      Time,
      date,
         image: req.file ? req.file.path.replace(/\\/g, "/") : null,
      price,
      gameLive
    };

    tournament.games.push(newGame);
    await tournament.save();

    res.status(201).json({
      message: "Game added successfully",
      updatedTournament : tournament
    });
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all games for a tournament
router.get("/:tournamentId/yourgames", async (req, res) => {
  try {
    const { tournamentId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json({ message: 'Your Games' , games:tournament.games});
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:tournamentId/:gameId", async (req, res) => {
  try {
    const { tournamentId, gameId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    // Find tournament
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Find game inside tournament
    const game = tournament.games.id(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Success response
    return res.status(200).json({
      message: "Game found",
      tournamentId,
      gameId,
      game,
    });
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router