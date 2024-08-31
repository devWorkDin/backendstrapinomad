"use strict";

/**
 * friend-request service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::friend-request.friend-request",
  ({ strapi }) => ({
    async create(data) {
      console.log("create friend request", data);
      // Appeler la méthode create du service de base pour créer la demande d'ami
      const friendRequest = await super.create(data);

      // Peupler les champs nécessaires (comme 'to' et 'from')
      const populatedFriendRequest = await strapi.entityService.findOne(
        "api::friend-request.friend-request",
        friendRequest.id,
        {
          populate: ["to", "from"],
        }
      );
      // Vérifier si strapi.io est défini
      strapi.io.on("connection", (socket) => {
        console.log("Un client s'est connecté");

        socket.on("get_pending_friend_requests", async (userId) => {
          try {
            const requests = await strapi.services[
              "api::friend-request.friend-request"
            ].find({
              filters: {
                to: userId,
                status: "pending",
              },
              populate: "from",
            });

            socket.emit("pending_friend_requests", requests.data);
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des demandes d'ami",
              error
            );
          }
        });
      });

      if (strapi.io) {
        // Émettre un événement via Socket.io avec les données peuplées
        strapi.io.emit("new_friend_request", populatedFriendRequest);
      } else {
        console.warn("Socket.io n'est pas initialisé dans Strapi");
      }

      return populatedFriendRequest;
    },
  })
);
