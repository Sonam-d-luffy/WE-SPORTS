
import express from 'express'
import Tournament from '../schema/tournamentSchema.js'
import Booking from '../schema/slotbookingSchema.js'
import QRCode from 'qrcode'
import dotenv from 'dotenv'
import { sendBookingEmail } from '../utils/mailer.js'
import Gamer from '../schema/gamerSchema.js'
dotenv.config()

const RANKS = [
  'bronze',
  'silver',
  'gold',
  'platinum',
  'diamond',
  'crown',
  'ace',
  'aceMaster',
  'aceDominator',
  'conqueror'
]

function canPlay(userRank, gameRank) {
  const userIndex = RANKS.indexOf(userRank)
  const gameIndex = RANKS.indexOf(gameRank)
  return userIndex >= gameIndex // true if user rank is >= required rank
}
const router = express.Router()


// ✅ Slot booking with UPI QR
router.post('/book', async (req, res) => {
  try {
    const { gameId, gamerId, tournamentId, instaId, userId, rank, username } =
      req.body
    if (!instaId || !userId || !rank || !username) {
      return res.status(400).json({ message: 'fill all required fields' })
    }

    // Find the tournament & game
    const tournament = await Tournament.findById(tournamentId)
    if (!tournament) {
      return res.status(404).json({ msg: 'Tournament not found' })
    }

                                       
    const game = tournament.games.id(gameId)
    if (!game) return res.status(404).json({ msg: 'Game not found' })

    // Check if game is live
    if (game.gameLive !== 'yes') {
      return res
        .status(400)
        .json({ msg: 'Booking not allowed. Game is not live!' })
    }
 

    // eligibility
    if (!canPlay(rank, game.rank)) {
      return res.status(403).json({
        message:
          'Sorry , your rank is low for this game , you can choose another one'
      })
    }

    const amount = game.price

    // ✅ Build UPI Payment Link (replace with your UPI ID)
    const upiId = process.env.UPI_ID || 'yourupiid@upi'
    const upiName = 'Tournament Organiser'

    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      upiName
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(
      'WE'
    )}`

    // ✅ Generate QR Code
    const qrCodeUrl = await QRCode.toDataURL(upiLink)

    // // Save booking in DB (status = pending until verified manually)
    // const booking = new Booking({
    //   userId,
    //   instaId,
    //   gameId,
    //   gamerId,
    //   username,
    //   tournamentId,
    //   rank,
    //   amount,
    //   paymentStatus: 'pending',
    //   paymentLink: upiLink,
    //   qrCode: qrCodeUrl
    // })

    // await booking.save()

     return res.status(200).json({
      message: 'Scan QR to pay',
      paymentInfo: {
        qrCode: qrCodeUrl,
        upiLink,
        amount
      }
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
})
router.post("/verify-booking", async (req, res) => {
  try {
    const { gameId, tournamentId, gamerId, instaId, userId, rank, username, transactionId } = req.body;

    if (!transactionId || !gameId || !tournamentId || !gamerId) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Find tournament & game (optional: check eligibility, rank)
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    const game = tournament.games.id(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });
      const gamer = await Gamer.findById(gamerId);
      if (!gamer) return res.status(404).json({ message: "User not found" });
    // Save booking now
    const booking = new Booking({
      userId,
      instaId,
      gameId,
      gamerId,
      username,
      tournamentId,
      rank,
      name:game.name,
      amount: game.price,
      paymentStatus: "success",
      transactionId,
    });

         await sendBookingEmail(gamer.email, {
      name: username,
      gameName: game.name, // fetch dynamically if you want
      date:game.date,
      link:game.link,
      time: game.Time,
      tournamentName: tournament.gameName, // fetch from tournament schema
    });
    await booking.save();
     

    res.status(200).json({ message: "Payment verified and booking saved!", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get('/your-bookings/:gamerId' , async(req , res) => {
    try {
        const {gamerId} = req.params
        const bookings = await Booking.find({gamerId})
        if(!bookings.length)  return res.status(404).json({message : 'Sorry you do not have any booking yet'})
            return res.status(200).json({message:'Your bookings' , bookings : bookings})
    } catch (error) {
          console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
    }
})

router.get('/games-booking/:gameId' , async(req , res) => {
        try {
    const {gameId} = req.params
    const bookings = await Booking.find({gameId})
    if(!bookings.length) return res.status(404).json({message: 'Sorry you do not have any booking yet'})
    return res.status(200).json({message : 'Your bookings' , bookings: bookings})
    } catch (error) {
          console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
    }

})
router.delete('/delete-booking/:bookingId' , async(req , res) => {
  try {
    const {bookingId} = req.params

    const booking = await Booking.findById(bookingId)
    if(!booking) return res.status(404).json({message : 'Booking not found'})

      await Booking.findByIdAndDelete(bookingId)
      return res.status(200).json({message : 'Booking deleted successfully'}) 
  } catch (error) {
        console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
})


export default router;
 