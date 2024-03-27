const { response } = require('express');
const Favorite = require('../../models/favorite');


const create = async (request, response) => {
   try {
    const favorite = await Favorite.create({
        user : request.user._id,
        ...request.body
    });
    response.json(Favorite);
   }catch {
    console.log('err cf-');
   }
};

const index = async (request, response) => {
    try {
        const getFavorites = await Favorite.find( {id:  request.user._id} )
    }
}

module.exports = {
    create
};