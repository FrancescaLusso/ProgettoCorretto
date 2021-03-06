import FavoriteMovies from "../models/favorite-movies.js";

export const getFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteMovies.findOne({
            where: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }
        });
        
        if (favorite) {
            res.send(favorite);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteMovies.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Favorite Created",
            data: favorite
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getFavoriteByUserId = async (req, res) => {
    try {
        const favorite = await FavoriteMovies.findAll({
            where: {
                userId: req.params.userId,
            }
        });
        
        if (favorite) {
            res.send(favorite);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

/*export const updateRating = async (req, res) => {
    try {
        const rating = await Rating.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Rating Updated",
            data: rating
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}*/

export const deleteFavorite = async (req, res) => {
    try {
        await FavoriteMovies.destroy({
            where: {
                userId:req.params.userId,
                movieId: req.params.movieId
            }
        });
        res.json({
            "message": "Favorite Movie Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
